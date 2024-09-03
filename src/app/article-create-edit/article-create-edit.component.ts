import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Article } from '../app.types';
import { Router } from '@angular/router';
import { AppService } from '../services/app.component.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-article-create-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatButton,
  ],
  templateUrl: './article-create-edit.component.html',
  styleUrl: './article-create-edit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleCreateEditComponent {
  appService = inject(AppService);
  article = this.appService.article;
  router = inject(Router);
  articleForm = new FormGroup({
    _id: new FormControl(),
    author: new FormControl(),
    title: new FormControl(),
    content: new FormControl(),
    shortContent: new FormControl(),
    publishedAt: new FormControl(),
    updatedAt: new FormControl(),
  });

  constructor() {
    const articleId =
      this.router.getCurrentNavigation()?.extras.state?.['articleId'];
    if (!articleId) {
      console.log('edit mode off:', articleId);
    }
    if (articleId) {
      console.log('edit mode on:', articleId);
      this.appService.getArticleById(articleId);
      this.initForm(this.article);
    }
  }

  initForm(article: WritableSignal<Article | null>) {
    if (!article()) {
      return;
    }
    this.articleForm.setValue({
      _id: article()?._id,
      author: article()?.author,
      title: article()?.title,
      content: article()?.content,
      shortContent: article()?.shortContent,
      publishedAt: article()?.createdAt,
      updatedAt: article()?.updatedAt,
    });

    console.log('articleForm', this.articleForm.value);
  }
}
