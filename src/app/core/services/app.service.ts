import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Article } from '../../interfaces/app.interfaces';
import { Subscription } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AppService {
  http = inject(HttpClient);
  httpService = inject(HttpService);
  articles = signal<Article[]>([]);
  article = signal<Article | null>(null);

  url = {
    getAll: environment.apiUrl + '/api/getAll',
    getOne: environment.apiUrl + '/api/getOne',
    delete: environment.apiUrl + '/api/delete',
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
        this.httpService.handleError(error);
      },
    });
  }

  /**
   * Get article by id
   * @param articleId
   * @return The subscription object for the HTTP GET request
   */
  getArticleById(articleId: string) {
    return this.http.get<Article>(`${this.url.getOne}/${articleId}`).subscribe({
      next: (data: Article) => {
        this.article.set(data);
      },
      error: (error: HttpErrorResponse) => {
        this.httpService.handleError(error);
      },
    });
  }

  deleteArticle(_id: string) {
    this.http.delete(`${this.url.delete}/${_id}`).subscribe({
      next: () => {
        this.getAllArticles();
      },
      error: (error: HttpErrorResponse) => {
        this.httpService.handleError(error);
      },
    });
  }
}
