import { Routes } from '@angular/router';
import { RoleGuard } from '../../../core/guards/core.guard';

export const UserRoutes: Routes = [
  {
    path: 'users-list',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('../components/users/user-list/user-list.component').then(
        m => m.UserListComponent
      ),
  },
];
