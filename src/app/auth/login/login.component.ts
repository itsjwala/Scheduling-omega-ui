import { Roles } from '../../models/Role';
import { AuthService } from './../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  role: Roles;
  loginForm: FormGroup;
  token: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.token = this.authService.getToken();


    // this.authService.getAuthStream()
    //   .subscribe((e: any) => {
    //     // localStorage.setItem('id_token', this.token);
    //     // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    //   });
  }

    // console.log(this.registerForm.get('password').errors);


  loginUser(event) {
    event.preventDefault();
    this.authService.login(this.loginForm);
    this.router.navigate(['']);
  }

  addPreferences(event){
    event.preventDefault();
    // console.log(this.registerForm);
    this.authService.login(this.loginForm);
    this.router.navigate(['preferences']);
  }

  getRole(role) {
    this.role = role;
    
  }
}
