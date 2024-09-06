import { Routes } from '@angular/router';
import { RoleGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'articles-list',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('./features/articles/articles-list/articles-list.component').then(
        m => m.ArticlesListComponent
      ),
  },
  {
    path: 'article',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('./features/articles/article/article.component').then(
        m => m.ArticleComponent
      ),
  },
  {
    path: 'article-create-edit',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import(
        './features/articles/article-create-edit/article-create-edit.component'
      ).then(m => m.ArticleCreateEditComponent),
  },
  { path: '', redirectTo: '/articles-list', pathMatch: 'full' },
  { path: '**', redirectTo: '/articles-list', pathMatch: 'full' },
];
