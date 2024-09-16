import { Routes } from '@angular/router';
import { RoleGuard } from '../../../core/guards/core.guard';

export const UserRoutes: Routes = [
  {
    path: 'users-list',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('../components/users/users-list/users-list.component').then(
        m => m.UsersListComponent
      ),
  },
  {
    path: 'users-add',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('../components/users/user-add/user-add.component').then(
        m => m.UserAddComponent
      ),
  },
];
