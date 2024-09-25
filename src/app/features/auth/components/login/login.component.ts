import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    FormsModule,
    MatFormField,
    MatButton,
    NgIf,
    MatInput,
    MatCardTitle,
    MatCardSubtitle,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LoginComponent {
  loginService = inject(AuthService);
  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loginService.login(form.value);
    }
  }
}
