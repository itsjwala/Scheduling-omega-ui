import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';



import { InterviewerService} from '../interviewer.service';

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'interviewer-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @ViewChild('content', {static: false}) private content: ElementRef;

  events: any[];

  options: any;

  display: boolean = false;

  closeResult: string;

  slotForm: FormGroup;


  constructor(private modalService: NgbModal, private interviewerSvc: InterviewerService) { }


  ngOnInit() {

    
    this.events =  this.interviewerSvc.initializeEvents();
    this.options = this.interviewerSvc.initializeOptions();


    this.options = {...this.options,
                    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
                    select: (event) => {
                        this.open(this.content, event);

                    }    
                  };

    this.slotForm = this.interviewerSvc.slotForm();
    

                      
  }
  

  open(content, event) {
    console.log(event);

    let start = event.start;
    let end = event.end;
    let date  = `${start.getDate()}/${start.getMonth()+1}/${start.getFullYear()}`
    let startTime = `${start.getHours()}:${start.getMinutes()? start.getMinutes() : '00'}`;
    let endTime = `${end.getHours()}:${end.getMinutes()? end.getMinutes() : '00'}`;

    this.slotForm.patchValue({slotDate: event.startStr,
                  startTime: startTime,
                  endTime: endTime});
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      console.log(this.slotForm.value);
      
      
    }, (reason) => {
      console.log("Closed");
      
    });
  }

  formSubmit() {
    console.log(this.slotForm.value);
    
  }

  

}
