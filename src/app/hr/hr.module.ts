import { ScheduleFormComponent } from './schedule-form/schedule-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from '../material/material.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';


import { FullCalendarModule } from 'primeng/fullcalendar';
import { DialogModule } from 'primeng/dialog';
import { MatNativeDateModule, MatDialogModule } from '@angular/material';
import { DashComponent } from './dash/dash.component';
import { CommonsModule } from '../commons/commons.module';


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
  ],
  exports: [

  ],
  entryComponents: [
    ScheduleFormComponent
  ]
})
export class HrModule { }
