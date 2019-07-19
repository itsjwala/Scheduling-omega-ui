import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-view',
  templateUrl: './about-view.component.html',
  styleUrls: ['./about-view.component.css']
})
export class AboutViewComponent implements OnInit {


  editName = false;
  editPosition = false;
  user = {
    name: 'Sara Allen',
    position: 'Analyst',
    id: 'WT480',
    successful: 50
  };
  constructor() { }

  ngOnInit() {
  }

  toggleName() {
    this.editName = !this.editName;
  }

  togglePosition() {
    this.editPosition = !this.editPosition;
  }

  sendInfo(user) {
    console.log(user);
    this.editName = false;
    this.editPosition = false;
  }

}
