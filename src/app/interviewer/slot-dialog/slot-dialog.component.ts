import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-slot-dialog',
  templateUrl: './slot-dialog.component.html',
  styleUrls: ['./slot-dialog.component.css'],
})
export class SlotDialogComponent implements OnInit {


  isAvailableSlot;
  props;

  viewDate;
  viewFrom;
  viewTo;
  cancellationReason;

  constructor(private dialogRef: MatDialogRef<SlotDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.showDelete) {
      this.isAvailableSlot = data.event.event.extendedProps.availableSlot !== undefined;
      this.props = data.event.event.extendedProps;
      this.makeChips(data.event.event);
    }
    else{
      this.makeChips(data.event);
    }
  }

  makeChips(event){

    let start = event.start;
    let end = event.end;

    this.viewDate = start.toDateString();
    this.viewFrom = `${start.getHours() % 12 || 12}:${start.getMinutes() == 0 ? "00" : start.getMinutes()} ${start.getHours() < 12?"AM":"PM"}`;
    this.viewTo = `${end.getHours() % 12 || 12}:${end.getMinutes() == 0 ? "00" : end.getMinutes()} ${start.getHours() < 12 ? "AM" : "PM"}`;



  }

  ngOnInit() {

    console.log(this.data)
    // if(!this.isAvailableSlot&&this.data.showDelete)
    //   this.dialogRef.updateSize('25vw', '22vw');

    this.cancellationReason = new FormControl("",[Validators.required]);

  }

  cancelScheduleHandler(){
    this.dialogRef.close({btn:'DELETE',cancellationReason:this.cancellationReason.value});
  }

}
