import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  WritableSignal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Article } from '../../../../models/global.models';
import { Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../../shared/services/util.service';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-article-create-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatIconButton,
    MatIcon,
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    DatePipe,
    NgIf,
  ],
  templateUrl: './article-create-edit.component.html',
  styleUrl: './article-create-edit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleCreateEditComponent {
  articleService = inject(ArticleService);
  utilService = inject(UtilService);
  authService = inject(AuthService);
  router = inject(Router);
  article!: WritableSignal<Article | null>;
  articleId!: string;
  articleForm = new FormGroup({
    _id: new FormControl(),
    author: new FormControl({
      value: this.authService.getUser().username,
      disabled: true,
    }),
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    content: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    shortContent: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    publishedAt: new FormControl(),
    updatedAt: new FormControl(),
  });
  isEdit = false;

  constructor() {
    this.articleId =
      this.router.getCurrentNavigation()?.extras.state?.['articleId'];
    this.isEdit = !!this.articleId;

    if (this.articleId) {
      this.articleService.getArticleById(this.articleId);
      effect(() => {
        const article = this.articleService.article();
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
  }

  saveArticle() {
    if (this.articleForm.valid) {
      const article = this.articleForm.value as Article;
      article.author = this.authService.getUser().username;
      if (this.articleId) {
        this.articleService.updateArticle(article);
      } else {
        this.articleService.creteArticle(article);
      }
    }
  }
}
