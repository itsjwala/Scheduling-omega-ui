import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sideBar = true;
  constructor(private router:Router,private authService:AuthService) { }

  ngOnInit() {
    // this.router.navigate(['profile/portfolio'])
  }

  toggleSidebar() {
    this.sideBar = !this.sideBar;
  }

  navigateToDashboard(){
    this.router.navigate([this.authService.getRole().toLowerCase()])
  }
}
