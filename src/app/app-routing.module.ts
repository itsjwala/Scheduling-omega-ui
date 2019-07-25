import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';



const routes: Routes = [
  {path : '', component:LandingPageComponent},
  {path:'hr',redirectTo:'hr',pathMatch:'full'},
  {path:'interviewer',redirectTo:'interviewer',pathMatch:'full'},
  { path: 'profile', redirectTo: 'commons', pathMatch: 'full'},
  { path: 'login', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'register', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'reports', redirectTo: 'admin', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {



 }
