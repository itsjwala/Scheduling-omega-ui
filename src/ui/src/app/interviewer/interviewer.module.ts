import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';

import {FullCalendarModule} from 'primeng/fullcalendar';


@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    FullCalendarModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class InterviewerModule { }
