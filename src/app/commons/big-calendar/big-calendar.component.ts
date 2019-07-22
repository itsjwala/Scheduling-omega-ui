import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import { CalendarInteractionService } from '../calendar-interaction.service';
import { FullCalendar } from 'primeng/fullcalendar';

@Component({
  selector: 'app-big-calendar',
  templateUrl: './big-calendar.component.html',
  styleUrls: ['./big-calendar.component.css']
})
export class BigCalendarComponent implements OnInit {

  @ViewChild("calendar", null) bigCalendar: FullCalendar;

  @Input("events") events = [];
  @Input("options")
  options = {}

  constructor(private calendarIntrService:CalendarInteractionService) { }

  ngOnInit() {
    this.options = {
      ...this.options,
      defaultDate: new Date(),
      // height: window.innerHeight * 0.9,
      contentHeight:'auto',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,listWeek,listMonth'
      },
      eventColor: '#4fc3f7',
      // eventRender: function (event, element, view) {
      //   if (event.color) {
      //     element.css('background-color', event.color)
      //   }
      // },
      buttonText: {
        timeGridWeek: 'Grid Week',
        listWeek:'List Week',
        listMonth:'List Month'
      },
      hiddenDays: [],
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
      themeSystem: 'bootstrap',
      plugins: [interactionPlugin,bootstrapPlugin,dayGridPlugin, timeGridPlugin, listPlugin ],
    };

    this.calendarIntrService.smallToBigCalendarStream.subscribe(date=>{
      this.bigCalendar.getCalendar().gotoDate(date);
    })


  }

}
