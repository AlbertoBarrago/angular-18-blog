import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatRadioButton } from '@angular/material/radio';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { AppService } from '../services/app.component.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-article-view',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgIf,
    MatCardContent,
    MatRadioButton,
    MatButton,
    MatIcon,
  ],
  templateUrl: './article-view.component.html',
  styleUrl: './article-view.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleViewComponent {
  appService = inject(AppService);
  article = this.appService.article;
  router = inject(Router);

  constructor() {
    const articleId =
      this.router.getCurrentNavigation()?.extras.state?.['articleId'];
    if (articleId) {
      this.getArticleById(articleId);
    }
  }

  getArticleById(articleId: string) {
    this.appService.getArticleById(articleId);
  }

  backToArticleView() {
    this.router.navigate(['/']).then(r => {
      console.log('Navigation successful:', r);
    });
  }
}
