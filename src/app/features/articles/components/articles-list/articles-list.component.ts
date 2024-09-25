import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ArticleService } from '../../services/article.service';
import {
  CommonModule,
  JsonPipe,
  NgClass,
  NgOptimizedImage,
} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
} from '@angular/material/card';
import { MatButton, MatFabButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { UtilService } from '../../../../shared/services/util.service';
import { FilterComponent } from '../../../../shared/components/filter/filter.component';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { AuthService } from '../../../../core/features/auth/services/auth.service';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatIcon,
    NgClass,
    NgOptimizedImage,
    MatCardContent,
    FilterComponent,
    MatFabButton,
    MatPaginator,
    MatPaginatorModule,
  ],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticlesListComponent implements OnInit, OnDestroy {
  articleService = inject(ArticleService);
  utilService = inject(UtilService);
  authService = inject(AuthService);
  router = inject(Router);
  articles = this.articleService.articles;
  readonly dialog = inject(MatDialog);
  emptyListImagePath = './assets/images/empty_list.png';

  ngOnInit() {
    this.articleService.filterArticles();
  }

  openArticle(articleId: string) {
    this.router.navigate(['/articles/article-view'], {
      state: { articleId: articleId },
    });
  }

  editArticle(articleId: string | null, isEdit = false) {
    this.articleService.openCreateOrEditArticleView(articleId, isEdit);
  }

  search($event: string) {
    const q = $event;
    this.articleService.filterArticles({
      q,
    });
  }

  performPagination($event: PageEvent) {
    this.articleService.performPagination($event);
  }

  ngOnDestroy() {
    this.articleService.clearArticles();
  }
}
