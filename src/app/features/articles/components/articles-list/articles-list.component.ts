import {
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
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
import { FilterComponent } from '../../../../shared/features/filter/filter.component';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { AuthService } from '../../../auth/services/auth.service';

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
export class ArticlesListComponent {
  articleService = inject(ArticleService);
  utilService = inject(UtilService);
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(MatDialog);

  articleLength = computed(() => this.articleService.totalElement());
  articles = this.articleService.articles;
  emptyListImagePath = './assets/images/empty_list.png';

  constructor() {
    this.articleService.filterArticles();
    effect(onCleanup => {
      onCleanup(() => {
        this.articleService.clearArticles();
      });
    });
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
}
