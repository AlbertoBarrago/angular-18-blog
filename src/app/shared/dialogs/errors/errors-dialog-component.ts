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
import { ErrorMessagePipe } from '../../pipes/errors-message.pipe';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: 'errors-dialog-component.html',
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
    ErrorMessagePipe,
  ],
})
export class ErrorsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ErrorsDialogComponent>);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      status: number;
    }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
