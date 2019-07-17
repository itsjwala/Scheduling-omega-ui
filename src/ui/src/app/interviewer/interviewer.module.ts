import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';


import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { MatNativeDateModule } from '@angular/material';



@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    DialogModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class InterviewerModule { }
