import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {
  Article,
  FilterArticles,
  PaginatedResponse,
} from '../../../models/global.models';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ErrorService } from '../../../shared/services/error.service';
import { AuthService } from '../../auth/services/auth.service';
import { PageEvent } from '@angular/material/paginator';

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
  page = signal<number>(1);
  pageSize = signal<number | null>(6);
  totalElement = signal<number>(0);

  url = {
    articleUrl: environment.apiUrl + '/api/articles',
  };

  /**
   * Get all articles
   * @return The subscription object for the HTTP GET request
   * @deprecated Use filterArticles() instead
   */
  getAllArticles(): Subscription {
    return this.http.get<Article[]>(this.url.articleUrl).subscribe({
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
    return this.http
      .get<Article>(`${this.url.articleUrl}/${articleId}`)
      .subscribe({
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
   * Creates a new article
   * @param article
   * @return The subscription object for the HTTP POST request
   */
  creteArticle(article: Article) {
    this.http.post<Article>(`${this.url.articleUrl}`, article).subscribe({
      next: () => {
        this.filterArticles();
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

  /**
   * Filter articles by title, content, shortContent, author
   * @param searchTerm
   * @return The subscription object for the HTTP GET request
   */
  filterArticles(searchTerm?: FilterArticles) {
    const queryFilter = searchTerm && searchTerm.q !== '' ? searchTerm.q : null;

    const filterUrl = `${this.url.articleUrl}/${this.page()}/${this.pageSize()}/${queryFilter}`;
    return this.http.get<PaginatedResponse<Article>>(filterUrl).subscribe({
      next: (resp: PaginatedResponse<Article>) => {
        this.page.set(resp.metadata.page);
        this.pageSize.set(resp.metadata.pageSize);
        this.totalElement.set(resp.metadata.totalCount);
        this.articles.set(resp.data);
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
      .patch<Article>(`${this.url.articleUrl}/${article._id}`, article)
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
   * Delete article by id
   * @param _id
   * @return The subscription object for the HTTP DELETE request
   */
  deleteArticle(_id: string) {
    this.http.delete(`${this.url.articleUrl}/${_id}`).subscribe({
      next: () => {
        this.filterArticles();
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Open edit or create article view
   * @param articleId
   * @param isEdit
   */
  openCreateOrEditArticleView(articleId: string | null, isEdit: boolean) {
    if (isEdit) {
      this.router.navigate(['/articles/article-edit'], {
        state: { articleId: articleId },
      });
      return;
    }

    this.router.navigate(['/articles/article-edit']);
  }

  /**
   * Perform pagination with page, pageSize, filter as q parameters
   * @param $event
   */
  performPagination($event: PageEvent) {
    this.page.set($event.pageIndex + 1);
    this.pageSize.set($event.pageSize);
    this.filterArticles({
      q: '',
    });
  }

  /**
   * Clear articles
   */
  clearArticles() {
    this.page.set(1);
    this.pageSize.set(null);
    this.articles.set([]);
  }
}
