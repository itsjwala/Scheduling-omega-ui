import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../AppConstants'
import * as moment from 'moment';
import { AuthService } from '../auth/auth.service';
import { Subject } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  events = []

  hashDateRanges = {}

  eventSubject: Subject<any> = new Subject();

  constructor(private _http: HttpClient, private authService: AuthService) { }

  fetchEvents(curStart, curEnd) {
    // console.log(curStart.toISOString())
    // console.log(curEnd.toISOString())
    let key = curStart.toISOString() + curEnd.toISOString();
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

      console.log(from)
      console.log(to)


      let url = `${AppConstants.baseURL}/interviewers/${this.authService.getEmployeeId()}/slots?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
      // let url = `http://127.0.0.1:8887/interviewer_with_id_available_slot.json`;
      console.log(url)
      // url = encodeURIComponent(url);
    //  console.log(url)
      this._http.get(url).subscribe((response: any) => {

        // console.log(response);
        let tempevts = [];
        response.forEach(obj => {

          // console.log(obj)
          let evt = {
            start: obj.slot.from,
            end: obj.slot.to,
            availableSlot: obj
          }
          // this.events.push(evt);
          tempevts.push(evt);

        })

        this.events = this.events.concat(tempevts);

        this.eventSubject.next(this.events);
        console.log(this.events);
      })


    }




    return null;
  }

}
