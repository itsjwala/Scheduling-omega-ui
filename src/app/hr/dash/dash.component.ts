import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';
import {CalenderService} from '../calender.service';


import { ScheduleFormComponent } from './../schedule-form/schedule-form.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private snackbarService: ShowSnackBarService, private dialog: MatDialog, private calenderService: CalenderService) { }
  bigCalendarOptions = {}
  smallCalendarOptions = {}
  events = []


  ngOnInit() {
    this.events  = this.calenderService.initializeEvents()
    this.bigCalendarOptions = {
      events : this.calenderService.initializeEvents(),
      selectable: false,
      // select: (event) => {
      //   console.log(event);
      //   this.openDialog(false);
      // },
      eventClick: (mouseEvt) => {
        // console.log(event)
        let {slot} = mouseEvt.event.extendedProps;
        this.openDialog(true, slot);
      },
      eventRender: (event) => {
        console.log("Printing event",event);
      }
    };
  }

  openDialog(showDelete, slot) {
    const dialogRef = this.dialog.open(ScheduleFormComponent, {
      data: {
        showDelete,
        slot
      }
    });


    dialogRef.afterClosed().subscribe(result => {

      // if (result === undefined || result === "CANCEL") {
      //   //do nothing
      // }
      // else if (result === "CONFIRM") {
      //   // add slot
      //   //available
      //   this.snackbarService.openSnackBar("Slot confirmed successfully")
      // }
      // else if (result === "DELETE") {
      //   // delete slot

      //   //available or schedule
      //   this.snackbarService.openSnackBar("Slot cancelled successfully")

      // }

      

      console.log("dialog closed", result);
    })

  }


}
