import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AppService } from '../services/app.component.service';
import { JsonPipe } from '@angular/common';
import { MatCard, MatCardActions, MatCardHeader } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../dialogs/confirm/confirm-dialog';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardActions,
    MatButton,
    MatIcon,
  ],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArticleListComponent {
  appService = inject(AppService);
  router = inject(Router);
  articles = this.appService.articles;
  readonly dialog = inject(MatDialog);

  openArticle(articleId: string) {
    this.router
      .navigate(['/article-view'], { state: { articleId: articleId } })
      .then(r => {
        console.log('Navigation successful:', r);
      });
  }

  editArticle(_id: string) {
    console.log('Edit article with id: ', _id);
  }

  confirmDelete(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete this article?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete article with id: ', _id);
        this.appService.deleteArticle(_id);
      } else {
        console.log('The dialog was closed without confirmation');
      }
    });
  }
}
