import { AppConstants } from './../../AppConstants';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


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
  viewDate;
  viewSlot;
  candidatesData: any = [];
  candidateData = {};

  cancellationReason;

  options = [];
  filteredOptions: Observable<string[]>;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private hrSvc: HrService,
    private dialogRef: MatDialogRef<ScheduleFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient) {
    if (!data.isAvailable) {
      this.level = data.slot.level;
      this.tech = data.slot.technology;
    }
    console.log(data);

  }

  ngOnInit() {

    let start = new Date(this.data.slot.slot.from);
    this.viewDate = start;
    this.startTime = `${start.getHours() % 12 || 12}:${start.getMinutes() == 0 ? "00" : start.getMinutes()} ${start.getHours() < 12 ? "AM" : "PM"}`;

    let end = new Date(this.data.slot.slot.to);

    this.endTime = `${end.getHours() % 12 || 12}:${end.getMinutes() == 0 ? "00" : end.getMinutes()} ${start.getHours() < 12 ? "AM" : "PM"}`;


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
    if (this.data.isAvailable) {
      this.http.get(AppConstants.getCandidatesInfoURL).subscribe(e => {
        this.candidatesData = e;
        // console.log(this.candidatesData);
        this.candidatesData.map((candidate) => {
          this.options = [...this.options, candidate.name];
        });
        // console.log(this.options);


      })

      this.filteredOptions = this.scheduleForm.get('candidateName').valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );
    }
    else{
      this.scheduleForm.patchValue({
        'candidateID': this.data.slot.candidate.id,
        'candidateName': this.data.slot.candidate.name,
        'candidatePh': this.data.slot.candidate.phoneNum,
        'candidateCV': this.data.slot.candidate.fileName,
        'interviewDescr': this.data.slot.interviewDescription
      })
    }


    this.cancellationReason = new FormControl("", [Validators.required]);

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  addTech(tech) {
    this.tech = tech.technology;
    this.techId = tech.id;
    this.scheduleForm.patchValue({
      technology: tech.technology,
      technologyId: tech.id
    });
  }

  addLevel(level) {
    this.level = level.level;
    this.levelId = level.id;
    this.scheduleForm.patchValue({
      round: level.level,
      roundId: level.id
    });
  }

  getCandidateName(event) {
    // console.log(event);
    this.candidatesData.filter((candidate) => {
      // console.log(this.scheduleForm.value.candidateName);
      const candidateName = this.scheduleForm.value.candidateName;
      if (candidateName === candidate.name) {
        this.scheduleForm.patchValue(
          {
            'candidateID': candidate.id,
            'candidateName': candidate.name,
            'candidatePh': candidate.phoneNum,
            'candidateCV': candidate.fileName,
            // 'interviewDescr': '',
            // 'round': this.level,
            // 'technology': this.tech,
            // 'roundId': this.levelId,
            // 'technologyId': this.techId
          });
        console.log("updated..")
      }
    })
  }

  modalClose(event) {
    if (event === 'close')
      this.dialogRef.close();
    else if (event === 'submit') {
      if (this.scheduleForm.valid) {
        this.dialogRef.close({ ...this.scheduleForm.value, interviewerId: this.data.slot.interviewerId, slotId: this.data.slot.slotId});
      }
    }
    else if (event === "delete"){
      this.dialogRef.close(this.cancellationReason.value);
    }


  }

}
