import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HrService } from '../hr.service';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {


  @ViewChild('content', { static: false }) private content: ElementRef;

  scheduleForm:FormGroup;

  startTime;
  endTime;
  slotDate;

  constructor(private modalService: NgbModal,private fb: FormBuilder,private hrSvc :HrService) { }

  ngOnInit() {
    console.log("dsfsdfdsfd")
    this.scheduleForm = this.fb.group({
      candidateName: ['', Validators.required],
      candidatePh: ['', Validators.required],
      candidateCV: ['', Validators.required],
      interviewDescr: [''],
      round: ['', Validators.required],
      technology: ['', Validators.required]
    })




  }

  open(event) {
    console.log(event);
    console.log(event._def.extendedProps);

    let start = event.start;
    let end = event.end;

    this.startTime = `${start.getHours()}:${start.getMinutes() ? start.getMinutes() : '00'}`;

    if (end)
      this.endTime = `${end.getHours()}:${end.getMinutes() ? end.getMinutes() : '00'}`;

    this.slotDate = `${event.start.getDate()}/${event.start.getMonth()}/${event.start.getFullYear()}`;

    this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      console.log(result);
      console.log(this.scheduleForm.value);
    }, (reason) => {
      console.log("Closed");

    });
  }




}
