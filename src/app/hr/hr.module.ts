import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';


import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { DashComponent } from './dash/dash.component';
import { CommonsModule } from '../commons/commons.module';
import { AuthModule } from '../auth/auth.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DashComponent, ScheduleFormComponent],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    FullCalendarModule,
    DialogModule,
    CommonsModule,
    AuthModule,
    HttpClientModule
  ],
  exports: [

  ],
  entryComponents: [
    ScheduleFormComponent
  ]
})
export class HrModule { }
