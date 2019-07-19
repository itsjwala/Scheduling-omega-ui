import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup } from '@angular/forms';

import { InterviewerService } from '../interviewer.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'interviewer-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('calendar', { static: false }) calendar: FullCalendar;

  events: any[];

  options: any;

  smallCalendarOptions: any;

  display: boolean = false;

  closeResult: string;

  slotForm: FormGroup;


  constructor(private interviewerSvc: InterviewerService, private snackBar: MatSnackBar) { }


  ngOnInit() {

    this.events = this.interviewerSvc.initializeEvents();

    this.options = this.interviewerSvc.initializeOptions();


    this.options = {
      ...this.options,
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      select: (event) => {
        this.open( event);
      }
    };

    this.slotForm = this.interviewerSvc.slotForm();

    this.smallCalendarOptions = this.interviewerSvc.smallCalendarOptions();
    this.smallCalendarOptions = {
      ...this.smallCalendarOptions,
      plugins: [dayGridPlugin, interactionPlugin],
      dateClick: (event) => {
        this.calendar.getCalendar().gotoDate(event.date);
      }
    }



  }


  open( event) {

    let start = event.start;
    let end = event.end;
    let startTime = `${start.getHours()}:${start.getMinutes() ? start.getMinutes() : '00'}`;
    let endTime = `${end.getHours()}:${end.getMinutes() ? end.getMinutes() : '00'}`;

    this.slotForm.patchValue({
      slotDate: event.startStr,
      startTime: startTime,
      endTime: endTime
    });

    console.log(event);

    this.openSnackBar();
  }

  openSnackBar() {
    this.snackBar.open("Slot added successfully", "Dismiss", {
      duration: 3000
    })
  }



}
