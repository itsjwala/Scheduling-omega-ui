import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sideBar = true;
  constructor() { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sideBar = !this.sideBar;
  }
}
