import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import { CalendarInteractionService } from '../calendar-interaction.service';
import { FullCalendar } from 'primeng/fullcalendar';
import { View } from '@fullcalendar/core';

@Component({
  selector: 'app-big-calendar',
  templateUrl: './big-calendar.component.html',
  styleUrls: ['./big-calendar.component.css']
})
export class BigCalendarComponent implements OnInit {

  @ViewChild("calendar",null) fcCalendar: FullCalendar;

  @Input("options")
  options = {}

  // @Input("events")
  // events = [];

  constructor(private calendarIntrService:CalendarInteractionService) { }

  ngOnInit() {
    this.options = {
      ...this.options,
      // datesRender: (info) => {
      //   // this.calendar.getCalendar().gotoDate(event.date);
      //   console.log(info)
      //   // this.calendarIntrService.bigToSmallCalendarStream.next(event.date);

      // },

      timeZone: 'local',
      defaultDate: new Date(),
      // height: window.innerHeight * 0.9,
      contentHeight:'auto',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'timeGridWeek,listWeek,listMonth'
      },
      eventColor: '#76FF03',
      // eventBackgroundColor: '#76FF03',

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
      maxTime: "20:30:00",
      minTime: "08:00:00",
      // maxTime: "08:00:00",
      // minTime: "22:00:00",
      slotDuration: "00:30:00",
      slotLabelInterval: "00:30:00",
      slotLabelFormat: {
        hour: '2-digit',
        minute: '2-digit',
      },
      themeSystem: 'bootstrap',
      plugins: [interactionPlugin,bootstrapPlugin,dayGridPlugin, timeGridPlugin, listPlugin ],
    };


  }
  ngAfterViewInit(){

    this.calendarIntrService.smallToBigCalendarStream.subscribe(date=>{
      this.fcCalendar.getCalendar().gotoDate(date);
    })

  }


}
