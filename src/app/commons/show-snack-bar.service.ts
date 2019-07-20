import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({

  providedIn: 'root'
})
export class ShowSnackBarService {

  constructor(private snackBar: MatSnackBar) { }
  openSnackBar(message) {
    this.snackBar.open(message, "Dismiss", {
      duration: 3000
    })
  }
}
