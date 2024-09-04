import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserLoggedIn } from '../interfaces/app.interfaces';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './snackbar.service';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly http = inject(HttpClient);
  readonly httpService = inject(HttpService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly snackBarService = inject(SnackbarService);

  url = {
    fetchUsers: environment.apiUrl + '/api/fetchUsers',
    createUser: environment.apiUrl + '/api/createUser',
    login: environment.apiUrl + '/api/login',
  };

  /**
   * Login and get token from server and set user logged in signal
   * @param credential
   */
  login(credential: UserLoggedIn) {
    this.http
      .post<UserLoggedIn>(`${this.url.login}`, {
        username: credential.username,
        password: credential.password,
      })
      .subscribe({
        next: (resp: UserLoggedIn) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));
          this.router.navigate(['/article-list']).then(() => null);
          this.snackBarService.openSnackBarWithTimer('Login successful');
        },
        error: (error: HttpErrorResponse) => {
          this.httpService.handleError(error);
        },
      });
  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
