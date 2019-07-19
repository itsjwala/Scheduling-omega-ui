import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

import { HrService } from '../hr.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'hr-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @ViewChild('content', { static: false }) private content: ElementRef;
  @ViewChild('calendar', { static: false }) calendar: FullCalendar;


  events: any[];

  options: any;

  smallCalendarOptions: any;

  display: boolean = false;

  closeResult: string;

  scheduleForm: FormGroup;

  startTime;
  endTime;
  slotDate;


  constructor(private modalService: NgbModal, private hrSvc: HrService) { }


  ngOnInit() {
    this.events = this.hrSvc.initializeEvents();
    this.options = this.hrSvc.initializeOptions();

    this.options = {
      ...this.options,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      eventClick: (event) => {
        this.open(this.content, event.event);
        console.log(event);
        }
    };

    this.smallCalendarOptions = this.hrSvc.smallCalendarOptions();
    this.smallCalendarOptions = {
      ...this.smallCalendarOptions,
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (event) => {
        this.calendar.getCalendar().gotoDate(event.date);         
      }
    }

    this.scheduleForm = this.hrSvc.scheduleForm();
  }


  open(content, event) {
    console.log(event);
    console.log(event._def.extendedProps);

    let start = event.start;
    let end = event.end;
    
    this.startTime = `${start.getHours()}:${start.getMinutes() ? start.getMinutes() : '00'}`;
    
    if(end)
      this.endTime = `${end.getHours()}:${end.getMinutes() ? end.getMinutes() : '00'}`;
    
      this.slotDate = `${event.start.getDate()}/${event.start.getMonth()}/${event.start.getFullYear()}`;

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      console.log(this.scheduleForm.value);
    }, (reason) => {
      console.log("Closed");

    });
  }

}
