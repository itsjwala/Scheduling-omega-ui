import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { HrService } from '../hr.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-schedule-form',
  templateUrl: './schedule-form.component.html',
  styleUrls: ['./schedule-form.component.css']
})
export class ScheduleFormComponent implements OnInit {


  @ViewChild('content', { static: false }) private content: ElementRef;

  scheduleForm: FormGroup;
  techs = '';
  levels = '';
  startTime;
  endTime;
  slotDate;
  candidatesData = [];
  candidateData = {};

  options = [];
  filteredOptions: Observable<string[]>;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private hrSvc: HrService,
    private dialogRef: MatDialogRef<ScheduleFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

    console.log(data);
  }

  ngOnInit() {
    // console.log("dsfsdfdsfd")
    this.scheduleForm = this.fb.group({
      candidateID: [''],
      candidateName: ['', Validators.required],
      candidatePh: ['', Validators.required],
      candidateCV: ['', Validators.required],
      interviewDescr: [''],
      round: ['', Validators.required],
      technology: ['', Validators.required],
    });

    this.candidatesData = [
      {
        id: 1,
        name: 'Anirudh Balakka',
        phone: '521',
        CVPath: '/anirudh'
      },
      {
        id: 2,
        name: 'Jigar Wala',
        phone: '894',
        CVPath: '/jigar'
      }
    ];

    this.candidatesData.map((candidate) => {
      this.options = [...this.options, candidate.name];
    });


    this.filteredOptions = this.scheduleForm.get('candidateName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addTech(tech) {
    this.techs = tech;
  }

  addLevel(level) {
    this.levels = level;
  }

  getCandidateName(event) {
    console.log(event);
    this.candidatesData.filter((candidate) => {
      // console.log(this.scheduleForm.value.candidateName);
      const candidateName = this.scheduleForm.value.candidateName;
      if (candidateName === candidate.name) {
        this.scheduleForm.setValue(
          {
            'candidateID': candidate.id,
            'candidateName': candidate.name,
            'candidatePh': candidate.phone,
            'candidateCV': candidate.CVPath,
            'interviewDescr': '',
            'round': '',
            'technology': ''
          });
        console.log("updated..")
      }
    })
  }

  scheduleFormSubmit(event){
    event.preventDeafult();

  }

  modalClose(){
    this.dialogRef.close(this.scheduleForm.value);
  }

  // open(event) {
  //   console.log(event);
  //   console.log(event._def.extendedProps);

  //   let start = event.start;
  //   let end = event.end;

  //   this.startTime = `${start.getHours()}:${start.getMinutes() ? start.getMinutes() : '00'}`;

  //   if (end)
  //     this.endTime = `${end.getHours()}:${end.getMinutes() ? end.getMinutes() : '00'}`;

  //   this.slotDate = `${event.start.getDate()}/${event.start.getMonth()}/${event.start.getFullYear()}`;
  //   this.modalService.open(this.content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
  //     console.log(result);
  //     console.log(this.scheduleForm.value);
  //   }, (reason) => {
  //     console.log("Closed");

  //   });
  // }
}
