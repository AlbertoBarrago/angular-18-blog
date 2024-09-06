import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
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
  router = inject(Router);
  articles = this.articleService.articles;
  readonly dialog = inject(MatDialog);
  emptyListImagePath = './assets/images/empty_list.png';

  openArticle(articleId: string) {
    this.router
      .navigate(['/article'], { state: { articleId: articleId } })
      .then(() => {
        //console.log('Navigation successful:');
      });
  }

  editArticle(articleId: string) {
    this.router
      .navigate(['/article-create-edit'], { state: { articleId: articleId } })
      .then(() => {
        //console.log('Navigation successful:');
      });
  }

  openArticleCreate() {
    this.router.navigate(['/article-create-edit']).then(() => {
      //console.log('Navigation successful:');
    });
  }

  search($event: string) {
    const q = $event;
    this.articleService.filterArticles({
      q,
    });
  }

  performPagination($event: PageEvent) {
    this.articleService.page.set($event.pageIndex + 1);
    this.articleService.pageSize.set($event.pageSize);
    this.articleService.filterArticles({
      q: '',
    });
  }
}
