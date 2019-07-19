import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { DashComponent } from './dash/dash.component';



@NgModule({
  declarations: [CalendarComponent, DashComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MatSnackBarModule,
    FullCalendarModule,
    RouterModule,
    DialogModule
  ],
  exports: [
    CalendarComponent
  ]
})
export class InterviewerModule { }
