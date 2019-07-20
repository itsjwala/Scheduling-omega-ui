import { Component, OnInit, Input, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { CalendarInteractionService } from '../calendar-interaction.service';
import { ViewEncapsulation } from '@angular/compiler/src/core';
import { FullCalendar } from 'primeng/fullcalendar';
import * as moment from 'moment';
import { BootstrapTheme } from '@fullcalendar/bootstrap';




@Component({
  selector: 'app-small-calendar',
  templateUrl: './small-calendar.component.html',
  styleUrls: ['./small-calendar.component.css'],
})
export class SmallCalendarComponent implements OnInit {
  @ViewChild("calendar", null) smallCalendar: FullCalendar;

  @Input("options")
  options={};

  constructor(private calendarIntrService: CalendarInteractionService) { }
  ngOnInit() {

    this.options = {
      ...this.options,
      defaultDate: new Date(),
      contentHeight: 'auto',
      header: {
        left: 'prev,next',
        center: '',
        right: 'title'
      },
      hiddenDays: [0],
      defaultView: 'dayGridMonth',
      allDaySlot: false,
      aspectRatio: 1.09,
      showNonCurrentDates: false,
      fixedWeekCount: false,
      selectable: true,

      select:  (data)=> {

        if(!moment(data.start).add(1, 'days').isSame(moment(data.end))){

          this.smallCalendar.calendar.unselect();
        }
      },
      themeSystem: 'bootstrap',
      plugins: [dayGridPlugin, interactionPlugin, bootstrapPlugin],
      dateClick: (event) => {
        // this.calendar.getCalendar().gotoDate(event.date);

        this.calendarIntrService.smallToBigCalendarStream.next(event.date);

      }
    };
  }

}
