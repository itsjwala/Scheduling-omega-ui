import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocomplete, MatAutocompleteModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatSnackBarModule
} from '@angular/material';
@NgModule({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule

  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSnackBarModule
  ],
})

export class MaterialModule { }
