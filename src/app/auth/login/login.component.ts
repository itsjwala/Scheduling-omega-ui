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

  registerForm: FormGroup;
  token: string;
  filteredOptions = ['HR', 'Interviewer'];
  role: string;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      wissenId: ['', Validators.required],
      phoneNum: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]],
      role: ['', Validators.required]
    });

    this.authService.getAuthStream()
      .subscribe((e: any) => {
        this.token = e.token;
        // localStorage.setItem('id_token', this.token);
        // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
      });
  }



    // console.log(this.registerForm.get('password').errors);


  registerUser(event) {
    event.preventDefault();
    // console.log(this.registerForm);
    this.authService.login(this.registerForm);
    this.router.navigate(['']);
  }

  addPreferences(event){
    event.preventDefault();
    // console.log(this.registerForm);
    this.authService.login(this.registerForm);
    this.router.navigate(['preferences']);
  }

  getRole(role) {
    this.role = role;
  }
}
