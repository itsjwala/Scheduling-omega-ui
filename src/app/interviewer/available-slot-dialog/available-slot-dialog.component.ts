import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-available-slot-dialog',
  templateUrl: './available-slot-dialog.component.html',
  styleUrls: ['./available-slot-dialog.component.css'],
})
export class AvailableSlotDialogComponent implements OnInit {




  constructor(private dialogRef: MatDialogRef<AvailableSlotDialogComponent>, @Inject(MAT_DIALOG_DATA) public showDelete: boolean) {

  }


  ngOnInit() {

  }

}
