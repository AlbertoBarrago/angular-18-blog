import { Component, Inject, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import {
  MatFormField,
  MatInput,
  MatInputModule,
  MatLabel,
} from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { CommonModule, NgForOf } from '@angular/common';
import { User } from '../../../../../models/global.models';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
    MatInput,
    MatLabel,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent {
  readonly dialogRef = inject(MatDialogRef<EditUserComponent>);
  userFormGroup: FormGroup = new FormGroup({
    username: new FormControl(''),
    role: new FormControl(''),
    email: new FormControl(''),
  });
  roles = [
    {
      value: 'USER',
      viewValue: 'User',
    },
    {
      value: 'ADMIN',
      viewValue: 'Admin',
    },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      user: User;
    }
  ) {
    this.prepareForm(this.data.user);
  }

  prepareForm(user: User) {
    this.userFormGroup.patchValue({
      username: user.username,
      role: user.role,
      email: user.email,
    });
    this.userFormGroup.get('role')?.disable();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(): void {
    this.dialogRef.close(this.userFormGroup.value);
  }
}
