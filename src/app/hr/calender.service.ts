import { HrService } from './hr.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  events = [];
  constructor(private hrService: HrService) { }

  initializeEvents() {

    // return [
    //   {
    //     "title": "All Day Event",
    //     "start": "2016-01-01"
    //   },
    //   {
    //     "title": "Long Event",
    //     "start": "2016-01-07",
    //     "end": "2016-01-10"
    //   },
    //   {
    //     "title": "Repeating Event",
    //     "start": "2016-01-09T16:00:00"
    //   },
    //   {
    //     "title": "Repeating Event",
    //     "start": "2019-07-17T16:00:00"
    //   },
    //   {
    //     "title": "Conference",
    //     "start": "2019-07-21T12:00:00",
    //     "end": "2019-07-21T14:00:00"
    //   }
    // ];

    let slots = this.hrService.getAvailbleSlots();
    const tempEvents = [];
    slots.map(slot => {
      tempEvents.push({
        'title': 'Interview',
        'start': slot.slot.from,
        'end': slot.slot.to,
        'slot': slot
      })
    });
    this.events = this.events.concat(tempEvents);
    console.log(this.events);
    return this.events;   
  }
}
