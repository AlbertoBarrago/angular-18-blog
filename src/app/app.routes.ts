import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/core.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/components/login/login.component').then(
        m => m.LoginComponent
      ),
  },
  {
    path: 'articles',
    canActivate: [RoleGuard],
    loadChildren: () =>
      import('./features/articles/routes/article.route').then(
        c => c.articlesRoutes
      ),
  },
  { path: '', redirectTo: '/articles/articles-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/articles/articles-list', pathMatch: 'full' },
];
