import { Component, OnInit } from '@angular/core';


import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  events: any[];

  options: any;

  ngOnInit() {
    this.events = [
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
        "start": "2016-01-16T16:00:00"
      },
      {
        "title": "Conference",
        "start": "2016-01-11",
        "end": "2016-01-13"
      }
    ];

    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      defaultDate: new Date(),
      height: window.innerHeight * 0.95,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      },
      hiddenDays: [0],
      defaultView: 'timeGridWeek',
      allDaySlot: false,
      maxTime: "21:00:00",
      minTime: "09:00:00",
      slotDuration: "00:30:00",
      slotLabelInterval: "00:30:00",
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      selectable: true,
      dateClick: (event) => {
        console.log(event);
      },
      select: (event) => {
        console.log(event);
      }
    };
  }

}
