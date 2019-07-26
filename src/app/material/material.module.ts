import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule, MatTabsModule,
  MatToolbarModule, MatMenuModule, MatIconModule, MatProgressSpinnerModule, MatDatepickerModule, MatNativeDateModule, MatAutocomplete, MatAutocompleteModule, MatSelectModule, MatFormFieldModule, MatCheckboxModule, MatSnackBarModule, MatChip, MatChipsModule,
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
    MatSnackBarModule,
    MatChipsModule,
    MatTabsModule

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
    MatSnackBarModule,
    MatChipsModule,
    MatTabsModule
  ],
})

export class MaterialModule { }
