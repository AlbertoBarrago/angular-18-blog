import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article, FilterArticles } from '../interfaces/app.interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from './snackbar.service';
import { ErrorService } from './error.service';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  readonly http = inject(HttpClient);
  readonly router = inject(Router);
  readonly snackBarService = inject(SnackbarService);
  readonly dialog = inject(MatDialog);
  readonly errorService = inject(ErrorService);
  readonly authService = inject(AuthService);
  articles = signal<Article[]>([]);
  article = signal<Article | null>(null);

  url = {
    getAll: environment.apiUrl + '/api/getAll',
    getOne: environment.apiUrl + '/api/getOne',
    delete: environment.apiUrl + '/api/delete',
    update: environment.apiUrl + '/api/update',
    create: environment.apiUrl + '/api/create',
    filter: environment.apiUrl + '/api/filter',
  };

  constructor() {
    this.filterArticles({
      q: this.authService.getUser().username,
    });
  }

  /**
   * Get all articles
   * @return The subscription object for the HTTP GET request
   */
  getAllArticles(): Subscription {
    return this.http.get<Article[]>(this.url.getAll).subscribe({
      next: (data: Article[]) => {
        this.articles.set(data);
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Get article by id
   * @param articleId
   * @return The Article object
   */
  getArticleById(articleId: string) {
    return this.http.get<Article>(`${this.url.getOne}/${articleId}`).subscribe({
      next: (data: Article) => {
        this.article.set(data);
        return {
          success: true,
        };
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Delete article by id
   * @param _id
   * @return The subscription object for the HTTP DELETE request
   */
  deleteArticle(_id: string) {
    this.http.delete(`${this.url.delete}/${_id}`).subscribe({
      next: () => {
        this.getAllArticles();
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Filter articles by title, content, shortContent, author
   * @param searchTerm
   * @return The subscription object for the HTTP GET request
   */
  filterArticles(searchTerm: FilterArticles) {
    debugger;
    return this.http
      .post<Article[]>(`${this.url.filter}`, { q: searchTerm.q })
      .subscribe({
        next: (data: Article[]) => {
          this.articles.set(data);
        },
        error: (error: HttpErrorResponse) => {
          this.errorService.handleError(error);
        },
      });
  }

  /**
   * Update article by id
   * @param article
   */
  updateArticle(article: Article) {
    this.http
      .patch<Article>(`${this.url.update}/${article._id}`, article)
      .subscribe({
        next: () => {
          this.getAllArticles();
          this.snackBarService.openSnackBarWithTimer(
            'Article updated successfully'
          );
        },
        error: (error: HttpErrorResponse) => {
          this.errorService.handleError(error);
        },
      });
  }
  /**
   * Creates a new article
   * @param article
   * @return The subscription object for the HTTP POST request
   */
  creteArticle(article: Article) {
    this.http.post<Article>(`${this.url.create}`, article).subscribe({
      next: () => {
        this.getAllArticles();
        this.snackBarService.openSnackBarWithTimer(
          'Article created successfully'
        );
        this.router.navigate(['/']).then(() => null);
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }
}
