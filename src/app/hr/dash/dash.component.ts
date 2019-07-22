import { AppConstants } from './../../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ShowSnackBarService } from 'src/app/commons/show-snack-bar.service';
import {CalenderService} from '../calender.service';


import { ScheduleFormComponent } from './../schedule-form/schedule-form.component';
import Candidate from '../../candidate/candidate';
import ScheduleSlotDTO from './scheduleSlotDTO';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  constructor(private snackbarService: ShowSnackBarService, 
    private dialog: MatDialog, private calenderService: CalenderService,
    private http: HttpClient) { }
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
        // console.log("Printing event",event);
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
      if(result){
        console.log("dialog closed", result);
        // console.log(this.events);
        const scheduleSLotDTO = new ScheduleSlotDTO();
        const candidate = new Candidate();

        candidate.setId = result.candidateID;
        candidate.setName = result.candidateName;
        candidate.setPhNum = result.candidatePh;
        candidate.setFileName = result.candidateCV;

        scheduleSLotDTO.setSlotId = this.events[0].slot.slotId;
        scheduleSLotDTO.setInterviewerId = this.events[0].slot.interviewerId;
        scheduleSLotDTO.setHrId = 1;
        scheduleSLotDTO.setInterviewDescription = result.interviewDescr;
        scheduleSLotDTO.setCandidate = candidate;
        scheduleSLotDTO.setTechnology = result.technologyId;
        scheduleSLotDTO.setLevelId = result.roundId;

        
        console.log(scheduleSLotDTO);
        
        this.http.post(AppConstants.addScheduledSlotURL, scheduleSLotDTO)
        .subscribe((e :any)  => {
          console.log(e.message);
        });
      }
    })

  }


}
