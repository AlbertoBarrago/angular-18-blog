import { Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';

export const routes: Routes = [
  { path: 'blog-list', component: BlogListComponent },
  { path: '',   redirectTo: '/blog-list', pathMatch: 'full' }
];
