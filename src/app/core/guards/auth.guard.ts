import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const expectedRole = ['ADMIN', 'USER'];
    const token = this.auth.getToken();

    if (!token) {
      this.router.navigate(['login']);
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));

    if (!expectedRole.includes(payload.role)) {
      console.log('Unauthorized access');
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
