import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ErrorService } from '../../../shared/services/error.service';
import { User } from '../../../shared/interfaces/core.interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly http = inject(HttpClient);
  readonly errorService = inject(ErrorService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly snackBarService = inject(SnackbarService);

  url = {
    users: environment.apiUrl + '/api/',
  };

  getUserList() {
    return this.http.get<[User]>(`${this.url.users}/users`).subscribe({
      next: (data: [User]) => {
        console.log(data);
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }
}
