import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { JwtPayload, UserRole } from '../../models/global.models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    const token = this.auth.getToken();

    if (!token) {
      this.router.navigate(['login']);
      return of(false);
    }
    const payload: JwtPayload = JSON.parse(atob(token.split('.')[1]));

    return this.validateRole(payload);
  }

  private validateRole(payload: JwtPayload): Observable<boolean> {
    const expectedRoles: UserRole[] = ['ADMIN', 'USER'];

    if (!expectedRoles.includes(payload.role)) {
      console.log('Unauthorized access');
      this.router.navigate(['login']);
      return of(false);
    }

    return of(true);
  }
}
