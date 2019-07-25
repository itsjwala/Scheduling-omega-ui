
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import * as moment from "moment";



import { LoginComponent } from './login/login.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './jwt.interceptor';



@NgModule({
  declarations: [LoginComponent, PreferencesComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers:[
    AuthService,
    TokenInterceptor
  ]
})
export class AuthModule { }
