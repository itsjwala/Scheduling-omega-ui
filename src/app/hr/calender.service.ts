import { HrService } from './hr.service';
import { Injectable } from '@angular/core';
import { AppConstants } from '../AppConstants';
import { HttpClient } from '@angular/common/http';
import ScheduleSlotDTO from '../models/scheduleSlotDTO';
import Candidate from '../models/candidate';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';
import { ShowSnackBarService } from '../commons/show-snack-bar.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  events = [];

  eventSubject: Subject<any> = new Subject();
  hashDateRanges = {}



  constructor(private hrService: HrService, private http: HttpClient, private authService: AuthService, private snackbarServive: ShowSnackBarService, private _http:HttpClient) { }

  private parseAvailableToEvent(obj) {
    return {
      start: obj.slot.from,
      end: obj.slot.to,
      // title: "Available",
      availableSlot: obj
    };
  }

  private parseScheduledToEvent(obj) {

    return {
      start: obj.slot.from,
      end: obj.slot.to,
      title: `${obj.level} - ${obj.technology}`,
      scheduleSlot: obj
    };

  }

  fetchEvents(curStart, curEnd){
    let key = curStart.toISOString() + curEnd.toISOString();
    console.log(this.hashDateRanges)
    if (!this.hashDateRanges[key]) {
      let begin = moment(curStart).isoWeekday(1).subtract(1, 'day');
      let end = moment(curEnd).isoWeekday(7);
      // console.log(begin.toISOString())
      // console.log("************")


      // console.log(begin.format())
      // console.log(end)
      // console.log(end.toISOString())
      this.hashDateRanges[key] = true;


      let from = begin.format();
      let to = end.format();

      // console.log(from)
      // console.log(to)


      let url = `${AppConstants.baseURL}/interviewers/slots?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      // let url = `http://127.0.0.1:8887/hr_see_all_interviewer_available_slot.json`;
      // console.log(url)
      // url = encodeURIComponent(url);
      //  console.log(url)
      this._http.get(url).subscribe((response: any) => {

        // console.log(response);
        let tempevts = [];
        response.forEach(obj => {

          // console.log(obj)
          let evt = this.parseAvailableToEvent(obj);
          // this.events.push(evt);
          tempevts.push(evt);

        })

        this.events = this.events.concat(tempevts);

        this.eventSubject.next(this.events);
        // console.log(this.events);
      })
      let url2 = `${AppConstants.baseURL}/hrs/${this.authService.getEmployeeId()}/schedules?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      // let url2 = `http://127.0.0.1:8887/hr_see_all_scheduled_interviews.json`;

      // let url2 =
      this._http.get(url2).subscribe((response: any) => {

        // console.log(response);
        let tempevts = [];
        response.forEach(obj => {

          // console.log(obj)
          let evt = this.parseScheduledToEvent(obj);
          // this.events.push(evt);
          tempevts.push(evt);

        })

        this.events = this.events.concat(tempevts);

        this.eventSubject.next(this.events);


        // console.log(this.events);
      })


    }
    else {
      console.log("after coming from profile", this.events);
      this.eventSubject.next(this.events);

    }
    return null;
  }

  sendEventsToStreamAgain() {
    this.eventSubject.next(this.events);

  }


  scheduleSlot(result){

    console.log("dialog closed", result);
    // console.log(this.events);
    const scheduleSLotDTO = new ScheduleSlotDTO();
    const candidate = new Candidate();

    candidate.setId = result.candidateID;
    candidate.setName = result.candidateName;
    candidate.setPhNum = result.candidatePh;
    candidate.setFileName = result.candidateCV;

    scheduleSLotDTO.setSlotId = result.slotId;
    scheduleSLotDTO.setInterviewerId = result.interviewerId;
    scheduleSLotDTO.setHrId = this.authService.getEmployeeId();
    scheduleSLotDTO.setInterviewDescription = result.interviewDescr;
    scheduleSLotDTO.setCandidate = candidate;
    scheduleSLotDTO.setTechnologyId = result.technologyId;
    scheduleSLotDTO.setLevelId = result.roundId;


    console.log(scheduleSLotDTO);

    this.http.post(AppConstants.addScheduledSlotURL, scheduleSLotDTO)
      .subscribe((e: any) => {
        // console.log(e);

        let scheduleEvent = this.parseScheduledToEvent(e);



        this.events = this.events.filter(e=> {
          if(e.scheduleSlot) return true;

          return e.availableSlot.slotId !== result.slotId

        })

        this.events =  this.events.concat(scheduleEvent);

        this.eventSubject.next(this.events);

        this.snackbarServive.openSnackBar("Interview Scheduled Successfull");
      },(error)=>{
        console.log(error);
          this.snackbarServive.openSnackBar("Problem Scheduling Interview");
      });


    }

  cancelInterview(scheduleId,cancellationReason){
    console.log(scheduleId);

    let url = `${AppConstants.baseURL}/hrs/${this.authService.getEmployeeId()}/schedules/${scheduleId}`;
    // console.log(this.)
    this._http.request('delete', url, { body: { cancellationReason } })
      .subscribe(response => {





        this.events = this.events.filter(e => {
          if(e.availableSlot) return true;

          return e.scheduleSlot.scheduleID !== scheduleId

        });
        this.events = this.events.concat(this.parseAvailableToEvent(response));
        this.eventSubject.next(this.events);

        this.snackbarServive.openSnackBar("Interview cancelled successfully");

      }, error => {
        this.snackbarServive.openSnackBar("Problem cancelling Interview");
      })
  }

}

