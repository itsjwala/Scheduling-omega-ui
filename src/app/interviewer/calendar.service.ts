import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {



  constructor() { }

  initializeEvents() {
    return [
      {
        "title": "All Day Event",
        "start": "2016-01-01"
      },
      {
        "title": "Long Event",
        "start": "2016-01-07",
        "end": "2016-01-10"
      },
      {
        "title": "Repeating Event",
        "start": "2016-01-09T16:00:00"
      },
      {
        "title": "Repeating Event",
        "start": "2019-07-17T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2019-07-17T12:00:00",
        "end": "2019-07-17T14:00:00"
      }
    ];
  }
}
