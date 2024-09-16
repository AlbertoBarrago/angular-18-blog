import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../../../shared/services/util.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { NgForOf } from '@angular/common';
import { SnackbarService } from '../../../../../shared/services/snackbar.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  utilService = inject(UtilService);
  snackBarService = inject(SnackbarService);
  userForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', [Validators.required]),
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

  addUser() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
      this.snackBarService.openSnackBarWithTimer(
        '👉🏻 Please fill in all required fields'
      );
      return;
    }
    console.log('add user', this.userForm.value);
  }
}
