import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  WritableSignal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Article } from '../app.types';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
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
  appService = inject(GlobalService);
  article!: WritableSignal<Article | null>;
  router = inject(Router);
  articleId!: string;
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
    this.articleId =
      this.router.getCurrentNavigation()?.extras.state?.['articleId'];

    if (this.articleId) {
      this.appService.getArticleById(this.articleId);
      effect(() => {
        //effect to update the form when the article changes
        const article = this.appService.article();
        if (article) {
          this.initForm(article);
        }
      });
    }
  }

  initForm(article: Article) {
    if (!article) {
      return;
    }
    this.articleForm.setValue({
      _id: article?._id,
      author: article?.author,
      title: article?.title,
      content: article?.content,
      shortContent: article?.shortContent,
      publishedAt: article?.createdAt,
      updatedAt: article?.updatedAt,
    });

    console.log('articleForm', this.articleForm.value);
  }
}
