import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article } from '../app.types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class HttpService {
  http = inject(HttpClient);
  router = inject(Router);
  readonly dialog = inject(MatDialog);
  articles = signal<Article[]>([]);
  article = signal<Article | null>(null);
  private _snackBar = inject(MatSnackBar);

  url = {
    getAll: environment.apiUrl + '/api/getAll',
    getOne: environment.apiUrl + '/api/getOne',
    delete: environment.apiUrl + '/api/delete',
    update: environment.apiUrl + '/api/update',
    create: environment.apiUrl + '/api/create',
  };

  constructor() {
    this.getAllArticles();
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
        this.handleError(error);
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
        this.handleError(error);
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
        this.handleError(error);
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
          this.openSnackBar('Article updated successfully', 'Close');
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        },
      });
  }

  /**
   * Handles the error by converting the error status to a human-readable message.
   * @param {any} error - The error object to handle.
   * @returns {Error} The constructed Error object.
   */
  handleError(error: HttpErrorResponse): Error {
    let message;
    switch (error.status) {
      case 400:
        message = 'Bad request';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
      case 502:
        message = 'Bad gateway';
        break;
      case 401:
        message = 'Unauthorized';
        break;
      default:
        message = error.message;
    }
    return new Error(message, error.error);
  }

  /**
   * Opens a snackbar with the specified message and action.
   * @param message
   * @param action
   */
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
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
        this.openSnackBar('Article created successfully', 'Close');
        this.router.navigate(['/']).then(() => null);
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      },
    });
  }
}
