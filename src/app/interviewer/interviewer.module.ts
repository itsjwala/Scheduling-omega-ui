import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';



import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { DashComponent } from './dash/dash.component';
import { CommonsModule } from '../commons/commons.module';
import { SlotDialogComponent } from './slot-dialog/slot-dialog.component';

import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '../auth/auth.module';
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  declarations: [DashComponent, SlotDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FullCalendarModule,
    RouterModule,
    DialogModule,
    MaterialModule,
    CommonsModule,
    HttpClientModule,
    AuthModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  exports: [

  ],
  entryComponents: [
    SlotDialogComponent
  ]

})
export class InterviewerModule { }
