import { Component, OnInit, ViewChild, ElementRef, ComponentRef, Type } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup } from '@angular/forms';

import { InterviewerService } from '../interviewer.service';
import { CalendarService } from '../calendar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvailableSlotDialogComponent } from '../available-slot-dialog/available-slot-dialog.component';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';
import { BigCalendarComponent } from 'src/app/commons/big-calendar/big-calendar.component';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css'],
})
export class DashComponent implements OnInit {

  @ViewChild(BigCalendarComponent,null) bigCalendar:BigCalendarComponent;

  events: any[] = [];

  bigCalendarOptions: any={};

  smallCalendarOptions: any={};

  slotForm: FormGroup;


  constructor(private calendarService: CalendarService, private interviewerSvc: InterviewerService, private dialog: MatDialog, private snackbarServive: ShowSnackBarService) { }


  ngOnInit() {

    this.bigCalendarOptions = {
      selectable: true,
      events:(info,cb,errorcb)=>{
        cb(this.events);
      },
      select: (event) => {
        this.openDialog(false);

      },
      eventClick: (event) => {
        // console.log(event)
        this.openDialog(true, event);


      },
      eventRender: (event) => {
        // console.log("event", event);
      }

    };

    this.smallCalendarOptions = {
      datesRender: (info) => {
        let { activeStart, activeEnd } = info.view;
        this.calendarService.fetchEvents(activeStart, activeEnd);

      },

    }

  }

  ngAfterViewInit(){
    this.calendarService.eventSubject.subscribe(events => {
      // console.log(events);
      this.events = events;
      this.bigCalendar.fcCalendar.calendar.refetchEvents();
    })
  }

  openDialog(showDelete, event?){


    const dialogRef = this.dialog.open(AvailableSlotDialogComponent,{
      data:showDelete,
      autoFocus: false
    });


    dialogRef.afterClosed().subscribe(result=>{

      if(result===undefined || result==="CANCEL"){
        //do nothing
      }
      else if(result==="CONFIRM"){
        // add slot
        //available

        this.snackbarServive.openSnackBar("Slot added successfully");
      }
      else if(result === "DELETE"){
        // delete slot

        //available or schedule
        this.snackbarServive.openSnackBar("Slot deleted successfully");

      }


  });

  }
}
