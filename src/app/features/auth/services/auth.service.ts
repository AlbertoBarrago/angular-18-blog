import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { UserLoggedIn, RoleEnum } from '../../../models/global.models';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ErrorService } from '../../../shared/services/error.service';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly http = inject(HttpClient);
  readonly errorService = inject(ErrorService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly snackBarService = inject(SnackbarService);

  url = {
    auth: environment.apiUrl + '/api/auth',
    refreshToken: environment.apiUrl + '/api/auth/refresh-token',
  };

  /**
   * Login and get token from server and set user logged in signal
   * @param credential
   */
  login(credential: UserLoggedIn) {
    this.http
      .post<UserLoggedIn>(`${this.url.auth}/login`, {
        username: credential.username,
        password: credential.password,
      })
      .subscribe({
        next: (resp: UserLoggedIn) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('user', JSON.stringify(resp.user));
          this.router
            .navigate(['/article/articles/articles-list'])
            .then(() => null);
          this.snackBarService.openSnackBarWithTimer('Login successful');
        },
        error: (error: HttpErrorResponse) => {
          this.errorService.handleError(error);
        },
      });
  }

  /**
   * Get user data from local storage
   */
  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * Logout and remove token from local storage
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return !!this.getToken();
  }

  /**
   * Check if user is admin
   */
  isUserAdmin() {
    return this.getUser().role === RoleEnum.ADMIN;
  }

  /**
   * Check if token is expired
   */
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    console.log('isExpired', expirationDate);
    return expirationDate <= new Date();
  }

  /**
   * Get token from local storage
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Refresh token and return new token
   */
  refreshToken(): Observable<string> {
    return this.http
      .get<{ token: string }>(`${this.url.refreshToken}`, {})
      .pipe(
        map(response => {
          localStorage.setItem('token', response.token);
          return response.token;
        })
      );
  }
}
