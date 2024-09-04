import { Routes } from '@angular/router';
import { ArticleListComponent } from './core/components/article-list/article-list.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RoleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'article-list',
    canActivate: [RoleGuard],
    loadComponent: () => ArticleListComponent,
  },
  {
    path: 'article-view',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('./core/components/article-view/article-view.component').then(
        m => m.ArticleViewComponent
      ),
  },
  {
    path: 'article-create-edit',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import(
        './core/components/article-create-edit/article-create-edit.component'
      ).then(m => m.ArticleCreateEditComponent),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
