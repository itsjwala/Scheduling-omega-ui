import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

const loginRoutes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        // children:
        //     [
        //         { path: '', component: CalendarComponent }
        //     ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(loginRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class LoginRoutingModule { }
