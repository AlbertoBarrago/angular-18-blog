import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';
import { UserRole } from '../../shared/interfaces/shared.interfaces';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.auth.isTokenExpired()
      ? this.auth.refreshToken().pipe(switchMap(() => this.validateRole()))
      : this.validateRole();
  }

  private validateRole(): Observable<boolean> {
    const expectedRoles: UserRole[] = ['ADMIN', 'USER'];
    const token = this.auth.getToken();

    if (!token) {
      this.router.navigate(['login']);
      return of(false);
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (!expectedRoles.includes(payload.role)) {
      console.log('Unauthorized access');
      this.router.navigate(['login']);
      return of(false);
    }

    return of(true);
  }
}
