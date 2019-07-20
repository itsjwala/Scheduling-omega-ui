import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashComponent } from './dash/dash.component';

const interviewerRoutes: Routes = [
    {
        path: 'interviewer',
        component: DashComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(interviewerRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class InterviewerRoutingModule { }
