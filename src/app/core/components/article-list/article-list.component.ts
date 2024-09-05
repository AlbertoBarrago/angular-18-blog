import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { ArticleService } from '../../../services/article.service';
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
import { UtilService } from '../../../services/util.service';
import { FilterComponent } from '../shared/filter/filter.component';

@Component({
  selector: 'app-article-list',
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
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleListComponent {
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
}
