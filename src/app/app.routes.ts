import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';

export const routes: Routes = [
  { path: 'article-list', component: ArticleListComponent },
  {
    path: 'article-view',
    loadComponent: () =>
      import('./article-view/article-view.component').then(
        m => m.ArticleViewComponent
      ),
  },
  { path: '', redirectTo: '/article-list', pathMatch: 'full' },
];
