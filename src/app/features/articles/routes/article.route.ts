import { Routes } from '@angular/router';
import { RoleGuard } from '../../../core/guards/core.guard';

export const ArticlesRoutes: Routes = [
  {
    path: 'articles-list',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('../components/articles-list/articles-list.component').then(
        m => m.ArticlesListComponent
      ),
  },
  {
    path: 'article-view',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import('../components/article/article.component').then(
        m => m.ArticleComponent
      ),
  },
  {
    path: 'article-edit',
    canActivate: [RoleGuard],
    loadComponent: () =>
      import(
        '../components/article-create-edit/article-create-edit.component'
      ).then(m => m.ArticleCreateEditComponent),
  },
];
