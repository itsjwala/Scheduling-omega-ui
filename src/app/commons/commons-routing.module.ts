import { AboutViewComponent } from './about-view/about-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { PreviousScheduleComponent } from './previous-schedule/previous-schedule.component';

const commonRoutes: Routes = [
    {
        path: 'commons',
        component: HomeComponent,
        children:
            [
                { path: 'previous', component: PreviousScheduleComponent },
                { path: 'about', component: AboutViewComponent},
                { path: 'portfolio', component: AboutViewComponent}
            ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(commonRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class CommonsRoutingModule { }
