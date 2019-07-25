import { LoginComponent } from './login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PreferencesComponent } from './preferences/preferences.component';
import { RegisterComponent } from './register/register.component';

const authRoutes: Routes = [
    { path: 'login',component: LoginComponent },
    { path: 'preferences', component: PreferencesComponent},
    { path: 'register', component: RegisterComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(authRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AuthRoutingModule { };

