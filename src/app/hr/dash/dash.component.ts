import { AppConstants } from './../../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';
import { CalenderService } from '../calender.service';


import { ScheduleFormComponent } from './../schedule-form/schedule-form.component';
import Candidate from '../../models/candidate';
import ScheduleSlotDTO from '../../models/scheduleSlotDTO';
import { AuthService } from 'src/app/auth/auth.service';
import { BigCalendarComponent } from 'src/app/commons/big-calendar/big-calendar.component';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  @ViewChild(BigCalendarComponent, null) bigCalendar: BigCalendarComponent;

  bigCalendarOptions = {}
  smallCalendarOptions = {}
  events = []
  subscription;


  constructor(private snackbarService: ShowSnackBarService,
    private dialog: MatDialog, private calendarService: CalenderService,
    private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.bigCalendarOptions = {
      selectable: false,
      events: (info, cb, errorcb) => {
        cb(this.events);
      },
      eventClick: (mouseEvt) => {
        // console.log(event)
        if (mouseEvt.event.extendedProps.availableSlot)
          this.openDialog(true, mouseEvt.event.extendedProps.availableSlot);
        else
          this.openDialog(false, mouseEvt.event.extendedProps.scheduleSlot);

      },
      eventRender: (info) => {
        // console.log("event", info);
        let slot = info.event.extendedProps;
        // let {slot} =

        if (slot.availableSlot) {
        }

        if (slot.scheduleSlot) {
          info.el.style.backgroundColor = "#FFEB3B"
          info.el.style.borderColor = "#FFEB3B"
        }
        // return info;


      }

    };
    this.smallCalendarOptions = {


      datesRender: (info) => {
        let { activeStart, activeEnd } = info.view;
        this.calendarService.fetchEvents(activeStart, activeEnd);

      }


    }
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
    // this.calendarService.createStreamAgain();
    // this.calendarService.eventSubject.unsubscribe();
    // this.calendarService.eventSubject.complete();
  }

  ngAfterViewInit() {
    // console.log()


    // this.calendarService.streamSendDataAgain();


    this.subscription = this.calendarService.eventSubject.subscribe(events => {
      // console.log("subscrpiton",events);
      this.events = events;
      // console.log(this.bigCalendar.fcCalendar);

      // if(this.bigCalendar.fcCalendar.calendar)
      this.bigCalendar.fcCalendar.calendar.refetchEvents();
    })
    //hack/patch this call back will be registered later
    this.calendarService.sendEventsToStreamAgain();

  }
  openDialog(isAvailable, slot) {
    const dialogRef = this.dialog.open(ScheduleFormComponent, {
      data: {
        isAvailable,
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
      if (result) {
        if (isAvailable)
          this.calendarService.scheduleSlot(result);
        else if (!isAvailable) {

          this.calendarService.cancelInterview(slot.scheduleID,result);
        }
      }

    })

  }


}
