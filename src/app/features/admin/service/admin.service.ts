import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ErrorService } from '../../../shared/services/error.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly http = inject(HttpClient);
  readonly errorService = inject(ErrorService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly snackBarService = inject(SnackbarService);

  url = {
    users: environment.apiUrl + '/api/users',
  };
}
