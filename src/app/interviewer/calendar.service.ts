import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../AppConstants'
import * as moment from 'moment';
import { AuthService } from '../auth/auth.service';
import { Subject, ReplaySubject } from 'rxjs';
import { ShowSnackBarService } from '../commons/show-snack-bar.service';




@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  events = []

  hashDateRanges = {}

  eventSubject: Subject<any> = new Subject();

  constructor(private _http: HttpClient, private authService: AuthService, private snackbarServive: ShowSnackBarService) { }

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
    // console.log(curStart.toISOString())
    // console.log(curEnd.toISOString())
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


      let url = `${AppConstants.baseURL}/interviewers/${this.authService.getEmployeeId()}/slots?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      // let url = `http://127.0.0.1:8887/interviewer_with_id_available_slot.json`;
      // let url2 = `http://127.0.0.1:8887/interviewer_see_allSchedule_interveiws.json`;
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
      let url2 = `${AppConstants.baseURL}/interviewers/${this.authService.getEmployeeId()}/schedules?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
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




  addSlotBetween(start, end) {

    // console.log(start)
    start = moment(start);
    end = moment(end);
    // console.log(start)
    let slots = [];

    while (start.isBefore(end)) {

      let slot = {

        from: start.format().slice(0, -6),
        to: start.add(30, 'minutes').format().slice(0, -6)
      }
      slots.push(slot);
    }

    console.log(slots);


    let url = `${AppConstants.baseURL}/interviewers/${this.authService.getEmployeeId()}/slots`;
    this._http.post(url, slots).subscribe((response: any) => {

      let tempevts = [];

      response.forEach(element => {
        tempevts.push(this.parseAvailableToEvent(element));
      });

      this.events = this.events.concat(tempevts);


      this.eventSubject.next(this.events);
      this.snackbarServive.openSnackBar("Slot added successfully");

    }, (error: any) => {

      this.snackbarServive.openSnackBar("Problem adding slot(s)");

    })

    // let newEvents = slots.map(slot=>{
    //   return {
    //     start:slot.from,
    //     end:slot.to,
    //     // title:'Available'
    //   }
    // });
    // this.events = [...this.events,...newEvents];
    // this.eventSubject.next(this.events);
    // this.snackbarServive.openSnackBar("Slot added successfully");


  }

  deleteAvailableSlot(event) {
    // console.log(this.events);
    // console.log(event)

    let { slotId } = event.extendedProps.availableSlot;
    let url = `${AppConstants.baseURL}/interviewers/${this.authService.getEmployeeId()}/slots/${slotId}`;

    this._http.delete(url).subscribe(response => {

      this.events = this.events.filter(e => e.availableSlot !== event.extendedProps.availableSlot);
      this.eventSubject.next(this.events);
      this.snackbarServive.openSnackBar("Slot deleted successfully");

    }, error => {
      this.snackbarServive.openSnackBar("Problem deleting slot");
    })



  }

  cancelScheduleSlot(event, cancellationReason) {
    // console.log(this.events);
    // console.log(event)
    let { scheduleID } = event.extendedProps.scheduleSlot;
    let url = `${AppConstants.baseURL}/interviewers/${this.authService.getEmployeeId()}/schedules/${scheduleID}`;
    // let url = `http://localhost:4200/interviewers/${this.authService.getEmployeeId()}/schedules/${scheduleID}`;



    this._http.request('delete', url, { body: { cancellationReason } })
      .subscribe(response => {

        this.events = this.events.filter(e => e.scheduleSlot !== event.extendedProps.scheduleSlot);
        this.eventSubject.next(this.events);

        this.snackbarServive.openSnackBar("Interview cancelled successfully");

      }, error => {
        this.snackbarServive.openSnackBar("Problem cancelling Interview");
      })



  }
}
