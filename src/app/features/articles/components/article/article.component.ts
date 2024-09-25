import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { DatePipe, NgIf } from '@angular/common';
import { MatRadioButton } from '@angular/material/radio';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { MatIcon } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { UtilService } from '../../../../shared/services/util.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    NgIf,
    MatCardContent,
    MatRadioButton,
    MatButton,
    MatIcon,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    DatePipe,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleComponent {
  appService = inject(ArticleService);
  utilService = inject(UtilService);
  router = inject(Router);
  article = this.appService.article;

  constructor() {
    const articleId =
      this.router.getCurrentNavigation()?.extras.state?.['articleId'];
    if (articleId) {
      this.appService.getArticleById(articleId);
    }
  }
}
