import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';
import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private snackbarService: ShowSnackBarService, private dialog: MatDialog) { }
  bigCalendarOptions = {}
  smallCalendarOptions = {}
  events=[]


  ngOnInit() {

    this.bigCalendarOptions = {
      events: this.events,
      selectable: false,
      select: (event) => {
        this.openDialog(false);

      },
      eventClick: (event) => {
        console.log(event)
        this.openDialog(true, event);


      }
    };
  }

  openDialog(showDelete, event?) {


    const dialogRef = this.dialog.open(ScheduleFormComponent, {
      data: showDelete
    });


    dialogRef.afterClosed().subscribe(result => {

      if (result === undefined || result === "CANCEL") {
        //do nothing
      }
      else if (result === "CONFIRM") {
        // add slot
        //available
        this.snackbarService.openSnackBar("Slot added successfully")
      }
      else if (result === "DELETE") {
        // delete slot

        //available or schedule
        this.snackbarService.openSnackBar("Slot deleted successfully")

      }

      console.log("dialog closed", result);
    })

  }


}
