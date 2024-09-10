import { Component, Inject, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'user-dialog-component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    DatePipe,
  ],
})
export class UserDialogComponent {
  readonly dialogRef = inject(MatDialogRef<UserDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      username: string;
      role: string;
      email: string;
      createdAt: string;
    }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
