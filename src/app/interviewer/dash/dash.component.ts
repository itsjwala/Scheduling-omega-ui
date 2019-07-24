import { Component, OnInit, ViewChild, ElementRef, ComponentRef, Type } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup } from '@angular/forms';

import { InterviewerService } from '../interviewer.service';
import { CalendarService } from '../calendar.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SlotDialogComponent } from '../slot-dialog/slot-dialog.component';
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

  subscription;

  constructor(private calendarService: CalendarService, private interviewerSvc: InterviewerService, private dialog: MatDialog, private snackbarServive: ShowSnackBarService) { }


  ngOnInit() {

    this.bigCalendarOptions = {
      selectable: true,
      events:(info,cb,errorcb)=>{
        cb(this.events);
      },
      select: (event) => {



        this.openDialog(false,event);

      },
      eventClick: (event) => {
        // console.log(event)
        this.openDialog(true, event);


      },
      eventRender: (info) => {
          // console.log("event", info);
          let slot = info.event.extendedProps;
          // let {slot} =

          if(slot.availableSlot){
          }

          if(slot.scheduleSlot){
            info.el.style.backgroundColor ="#FFEB3B"
            info.el.style.borderColor ="#FFEB3B"
          }
          // return info;


      }

    };

    this.smallCalendarOptions = {
      datesRender: (info) => {
        let { activeStart, activeEnd } = info.view;
        this.calendarService.fetchEvents(activeStart, activeEnd);

      }

    };





  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
    // this.calendarService.createStreamAgain();
    // this.calendarService.eventSubject.unsubscribe();
    // this.calendarService.eventSubject.complete();
  }

  ngAfterViewInit(){
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
  ngAfterViewChecked(){
    // console.log("view chedkd");
  }

  openDialog(showDelete, event){


    const dialogRef = this.dialog.open(SlotDialogComponent,{
      data:{showDelete,event},
      autoFocus: false,
      // height:"12vw",
      // width:"25vw"
    });


    dialogRef.afterClosed().subscribe(result=>{
      console.log(result);
      if(result===undefined || result==="CANCEL"){
        //do nothing
      }
      else if(result==="CONFIRM"){
        // add slot
        //available


        this.calendarService.addSlotBetween(event.start,event.end);


      }
      else if(result === "DELETE" || result.btn === "DELETE"){
        // delete slot

        if (event.event.extendedProps.availableSlot){
          this.calendarService.deleteAvailableSlot(event.event);
        }
        else{
          // console.log(result.cancellationReason)
          // result.cancellationResult;
          this.calendarService.cancelScheduleSlot(event.event, result.cancellationReason);
        }
      }


  });

  }
}
