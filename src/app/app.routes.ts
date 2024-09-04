import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/auth.guard';
import { LoginComponent } from './core/auth/login/login.component';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'article-list',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('./core/components/article-list/article-list.component').then(
        m => m.ArticleListComponent
      ),
  },
  {
    path: 'article',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('./core/components/article/article.component').then(
        m => m.ArticleComponent
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
  { path: '', redirectTo: '/article-list', pathMatch: 'full' },
];
