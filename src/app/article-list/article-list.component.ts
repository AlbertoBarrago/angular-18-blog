import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AppService } from '../services/app.component.service';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Article } from '../app.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [JsonPipe, MatCard, MatCardHeader, MatCardActions, MatButton],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleListComponent {
  appService = inject(AppService);
  router = inject(Router);
  articles = this.appService.articles;

  openArticle(articleId: string) {
    console.log(articleId);
    this.router
      .navigate(['/article-view'], { state: { articleId: articleId } })
      .then(r => {
        console.log('Navigation successful:', r);
      });
  }
}
