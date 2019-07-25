import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReportsComponent } from './reports/reports.component';
import { HrReportComponent } from './hr-report/hr-report.component';
import { InterviewerReportComponent } from './interviewer-report/interviewer-report.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: 'reports',
    component: ReportsComponent,
    children: [
      {
        path: 'hr-reports',
        component: HrReportComponent
      },

      {
        path: 'interviewer-reports',
        component: InterviewerReportComponent
      },

    ]


  }

]
@NgModule({
  declarations: [InterviewerReportComponent,HrReportComponent,ReportsComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    NgxSpinnerModule,
    MaterialModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  exports:[

    RouterModule

  ]
})
export class AdminModule { }
