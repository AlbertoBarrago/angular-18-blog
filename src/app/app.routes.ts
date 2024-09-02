import { Routes } from '@angular/router';
import { ArticleListComponent } from './article-list/article-list.component';

export const routes: Routes = [
  { path: 'article-list', component: ArticleListComponent },
  { path: '', redirectTo: '/article-list', pathMatch: 'full' },
];
