import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Article } from '../app.types';
import { Subscription } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  http = inject(HttpClient);
  articles = signal<Article[]>([]);

  url = {
    getAll: environment.apiUrl + '/api/getAll',
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
}
