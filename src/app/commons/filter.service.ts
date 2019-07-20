import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {


  technologies=[
  {id:1,technology:"Angular"},
  {id:2,technology:"Java"}
  ];

  levels = [
    { id: 1, level: "R1" },
    { id: 2, level: "R2" }
  ];
  interviewers=[
    { id: 1, name: "Jigar wala" },
    { id: 2, name: "Anirudh Balakka" },
    { id: 3, name: "Prithviraj maurya" },
  ]

  constructor() { }


  getTechnologies(){
    return this.technologies;
  }

  getLevels(){
    return this.levels;
  }
  getInterviewerNames(){
    return this.interviewers;
  }

}
