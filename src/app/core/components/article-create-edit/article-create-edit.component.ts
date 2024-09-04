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
import { Article } from '../../../interfaces/app.interfaces';
import { Router } from '@angular/router';
import { HttpService } from '../../../services/http.service';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { UtilService } from '../../../services/util.service';
import { DatePipe, NgIf } from '@angular/common';

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
    DatePipe,
    NgIf,
  ],
  templateUrl: './article-create-edit.component.html',
  styleUrl: './article-create-edit.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleCreateEditComponent {
  appService = inject(HttpService);
  utilService = inject(UtilService);
  article!: WritableSignal<Article | null>;
  router = inject(Router);
  articleId!: string;
  articleForm = new FormGroup({
    _id: new FormControl(),
    author: new FormControl('', Validators.required),
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
      this.appService.getArticleById(this.articleId);
      effect(() => {
        //effect to update the form when the article cha nges
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
  }

  saveArticle() {
    if (this.articleForm.valid) {
      const article = this.articleForm.value as Article;
      if (this.articleId) {
        this.appService.updateArticle(article);
      } else {
        this.appService.creteArticle(article);
      }
    }
  }
}
