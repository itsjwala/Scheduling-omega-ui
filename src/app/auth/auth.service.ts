import { Subject } from 'rxjs';
import { AppConstants } from './../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Employee from '../models/Employee';
import * as moment from "moment";
import Interviewer from '../models/interviewer';
import { ShowSnackBarService } from '../commons/show-snack-bar.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //role and auth code here
  // token: string;

  // id :number;
  // role:string;
  employee;

  interviewer: Interviewer;
  // authStream = new Subject();
  constructor(private http: HttpClient, private showSnack: ShowSnackBarService, private router: Router) { }


  getToken() {
    return localStorage.getItem('token');

  }

  getEmployeeId() {
    // return 1;

    return localStorage.getItem('id');
  }

  getRole() {
    return localStorage.getItem('role');
  }



  addInterviewer(preference) {
    console.log(this.employee);
    this.interviewer = new Interviewer();
    this.interviewer.setEmployee = this.employee;
    this.interviewer.setLevel = preference.levels;
    this.interviewer.setTechnology = preference.technologies;

    console.log(this.interviewer);
    this.http.post(AppConstants.addInterviewer, this.interviewer)
      .subscribe(res => this.setSession(res))
  }

  register(registerForm) {
    let { name, email, wissenId, phoneNum, role, password } = registerForm.value;
    this.employee = new Employee(email, name, wissenId, phoneNum, role.toUpperCase());
    console.log(this.employee);
    this.employee = { ...this.employee, password };
    if (role === "HR")
      return this.http.post(AppConstants.addEmployee, this.employee)

  }

  login(loginForm) {
    let { email, password } = loginForm.value;
    return this.http.post(AppConstants.loginUser(), {
      'username': email,
      password
    })


  }

  setSession(authResult) {
    let claim = this.decodeJwt(authResult.token);
    console.log(claim);
    // claim.id;
    // claim.role;

    const expiresAt = moment().add(claim.exp, 'milliseconds');

    localStorage.setItem('id', "" + claim.id);
    localStorage.setItem('role', "" + claim.role);
    localStorage.setItem('token', "" + authResult.token);
    localStorage.setItem("exp", "" + expiresAt.valueOf());
    if (claim.role === "HR")
      this.router.navigate(['hr']);
    else if (claim.role === "INTERVIEWER")
      this.router.navigate(['interviewer']);
    else if (claim.role === "ADMIN")
      this.router.navigate(['reports']);


  }

  private decodeJwt(token) {
    console.log(token)
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("exp");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return moment().isBefore(this.getExpiration());
  }

  getExpiration() {
    const expiration = localStorage.getItem("exp");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}

