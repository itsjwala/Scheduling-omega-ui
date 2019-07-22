import { AppConstants } from './../../AppConstants';
import { HttpClient } from '@angular/common/http';
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
  tech = '';
  techId: number;
  level = '';
  levelId: number;
  startTime;
  endTime;
  slotDate;
  candidatesData: any = [];
  candidateData = {};

  options = [];
  filteredOptions: Observable<string[]>;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private hrSvc: HrService,
    private dialogRef: MatDialogRef<ScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {

    // console.log(data);
  }

  ngOnInit() {
    // console.log("dsfsdfdsfd")
    this.scheduleForm = this.fb.group({
      candidateID: [''],
      candidateName: ['', Validators.required],
      candidatePh: ['', Validators.required],
      candidateCV: [''],
      interviewDescr: [''],
      round: ['', Validators.required],
      technology: ['', Validators.required],
      roundId: [''],
      technologyId: ['']
    });

    this.http.get(AppConstants.getCandidatesInfoURL).subscribe(e => {
      this.candidatesData = e;
      // console.log(this.candidatesData);
      this.candidatesData.map((candidate) => {
        this.options = [...this.options, candidate.name];
      });
      // console.log(this.options);

      this.filteredOptions = this.scheduleForm.get('candidateName').valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addTech(tech) {
    this.tech = tech.technology;
    this.techId = tech.id;
  }

  addLevel(level) {
    this.level = level.level;
    this.levelId = level.id;
  }

  getCandidateName(event) {
    // console.log(event);
    this.candidatesData.filter((candidate) => {
      // console.log(this.scheduleForm.value.candidateName);
      const candidateName = this.scheduleForm.value.candidateName;
      if (candidateName === candidate.name) {
        this.scheduleForm.setValue(
          {
            'candidateID': candidate.id,
            'candidateName': candidate.name,
            'candidatePh': candidate.phoneNum,
            'candidateCV': candidate.fileName,
            'interviewDescr': '',
            'round': this.level,
            'technology': this.tech,
            'roundId': this.levelId,
            'technologyId': this.techId
          });
        console.log("updated..")
      }
    })
  }

  scheduleFormSubmit(event) {
    event.preventDeafult();
  }

  modalClose(event) {
    if (event === 'close')
      this.dialogRef.close();
    if (event === 'submit') {
      if (this.scheduleForm.valid) {
        this.dialogRef.close(this.scheduleForm.value);
      }
    }

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
