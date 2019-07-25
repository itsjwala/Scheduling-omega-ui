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
import { FilterService } from './filter.service';


@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  // events = [];


  events = [];



  eventSubject: Subject<any> = new Subject();
  hashDateRanges = {}
  filter;



  filterFunction() {
    let obj = this.filter;
    // console.log(obj);
    //clear filter
    if (obj === null) {
      this.eventSubject.next(this.events);
      return;
    }


    //schedule filter
    let filterEvents = this.events.filter((e: any) => {

      if (obj.scheduled) {
        if (e.availableSlot)
          return false;
        else {
          console.log(e)
          return true;
        }
      }
      else
        return true;
    });


    //interviwewer name filter
    if (obj.interviewerName !== null && obj.interviewerName.length > 0) {
      filterEvents = filterEvents.filter((e: any) => {

        if (e.availableSlot)
          return e.availableSlot.interviewerName === obj.interviewerName;
        else
          return e.scheduleSlot.interviewerName === obj.interviewerName;

      })
    }
    if (obj.levelFields) {
      filterEvents = filterEvents.filter((e: any) => {
        // console.log(e)
        if (e.availableSlot) {

          let flag = e.availableSlot.levels.find(level => {
            return level.level === obj.levelFields;
          })
          return flag !== undefined;
        }
        else {
          return e.scheduleSlot.level === obj.levelFields;
        }


      })
    }


    if (obj.technologyFields) {
      filterEvents = filterEvents.filter((e: any) => {
        // console.log(e)
        if (e.availableSlot) {

          let flag = e.availableSlot.technologies.find(tech => {
            return tech.technology === obj.technologyFields;
          })
          return flag !== undefined;
        }
        else {
          return e.scheduleSlot.technology === obj.technologyFields;
        }


      })
    }




    // console.log(filterEvents)
    this.eventSubject.next(filterEvents);

  }

  constructor(private hrService: HrService, private http: HttpClient, private authService: AuthService, private snackbarServive: ShowSnackBarService, private _http: HttpClient, private filterService: FilterService) {
    this.filterService.filterEventSubject.subscribe((obj: any) => {


      this.filter = obj;

      this.filterFunction();


    });

  }

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

  fetchEvents(curStart, curEnd) {
    let key = curStart.toISOString() + curEnd.toISOString();
    // console.log(this.hashDateRanges)
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

        if (this.filter) {
          this.filterFunction();
        }
        else
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

        if (this.filter) {
          this.filterFunction();
        }
        else
          this.eventSubject.next(this.events);


        // console.log(this.events);
      })


    }
    else {
      console.log("after coming from profile", this.events);
      if (this.filter) {
        this.filterFunction();
      }
      else
        this.eventSubject.next(this.events);

    }
    return null;
  }

  sendEventsToStreamAgain() {
    if (this.filter) {
      this.filterFunction();
    }
    else
      this.eventSubject.next(this.events);

  }


  scheduleSlot(result) {

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
    scheduleSLotDTO.setHrId = Number.parseInt(this.authService.getEmployeeId());
    scheduleSLotDTO.setInterviewDescription = result.interviewDescr;
    scheduleSLotDTO.setCandidate = candidate;
    scheduleSLotDTO.setTechnologyId = result.technologyId;
    scheduleSLotDTO.setLevelId = result.roundId;


    console.log(scheduleSLotDTO);

    this.http.post(AppConstants.addScheduledSlotURL(this.authService.getEmployeeId()), scheduleSLotDTO)
      .subscribe((e: any) => {
        // console.log(e);

        let scheduleEvent = this.parseScheduledToEvent(e);



        this.events = this.events.filter(e => {
          if (e.scheduleSlot) return true;

          return e.availableSlot.slotId !== result.slotId

        })

        this.events = this.events.concat(scheduleEvent);

        if (this.filter) {
          this.filterFunction();
        }
        else
          this.eventSubject.next(this.events);

        this.snackbarServive.openSnackBar("Interview Scheduled Successfull");
      }, (error) => {
        console.log(error);
        this.snackbarServive.openSnackBar("Problem Scheduling Interview");
      });


  }

  cancelInterview(scheduleId, cancellationReason) {
    console.log(scheduleId);

    let url = `${AppConstants.baseURL}/hrs/${this.authService.getEmployeeId()}/schedules/${scheduleId}`;
    // console.log(this.)
    this._http.request('delete', url, { body: { cancellationReason } })
      .subscribe(response => {





        this.events = this.events.filter(e => {
          if (e.availableSlot) return true;

          return e.scheduleSlot.scheduleID !== scheduleId

        });
        this.events = this.events.concat(this.parseAvailableToEvent(response));
        if (this.filter) {
          this.filterFunction();
        }
        else
          this.eventSubject.next(this.events);

        this.snackbarServive.openSnackBar("Interview cancelled successfully");

      }, error => {
        this.snackbarServive.openSnackBar("Problem cancelling Interview");
      })
  }

}

