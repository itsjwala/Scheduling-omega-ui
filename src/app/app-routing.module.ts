import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {path : '', redirectTo: 'hr', pathMatch: 'full'},
  { path: 'profile', redirectTo: 'commons', pathMatch: 'full'},
  { path: 'login', redirectTo: 'auth', pathMatch: 'full'},
  { path: 'reports', redirectTo: 'commons', pathMatch: 'full'},
  { path: 'register', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
