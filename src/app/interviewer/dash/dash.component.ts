import { Component, OnInit, ViewChild } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup } from '@angular/forms';

import { InterviewerService } from '../interviewer.service';
import { CalendarService } from '../calendar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AvailableSlotDialogComponent } from '../available-slot-dialog/available-slot-dialog.component';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';


@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {



  events: any[];

  bigCalendarOptions: any={};

  smallCalendarOptions: any={};

  slotForm: FormGroup;


  constructor(private calendarService: CalendarService, private interviewerSvc: InterviewerService, private dialog: MatDialog, private snackbarServive: ShowSnackBarService) { }


  ngOnInit() {

    this.events = this.calendarService.initializeEvents();

    this.bigCalendarOptions = {
      events:this.events,
      selectable: true,
      select: (event) => {
        this.openDialog(false);

      },
      eventClick: (event) => {
        console.log(event)
        this.openDialog(true,event);
      },
    };
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

        this.snackbarServive.openSnackBar("Slot added successfully")
      }
      else if(result === "DELETE"){
        // delete slot

        //available or schedule
        this.snackbarServive.openSnackBar("Slot deleted successfully")

      }

      console.log("dialog closed",result);
    })

  }

  // open(event) {

  //   let start = event.start;
  //   let end = event.end;
  //   let startTime = `${start.getHours()}:${start.getMinutes() ? start.getMinutes() : '00'}`;
  //   let endTime = `${end.getHours()}:${end.getMinutes() ? end.getMinutes() : '00'}`;

  //   this.slotForm.patchValue({
  //     slotDate: event.startStr,
  //     startTime: startTime,
  //     endTime: endTime
  //   });

  //   console.log(event);

  //   this.openSnackBar();
  // }



}
