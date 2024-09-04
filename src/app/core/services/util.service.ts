import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../../interfaces/app.interfaces';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../dialogs/confirm/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class UtilService {
  router = inject(Router);
  globalService = inject(HttpService);
  readonly dialog = inject(MatDialog);
  article = signal<Article | null>(null);

  /**
   * Navigates back to the article view.
   */
  backToArticleView() {
    this.router.navigate(['/']).then(() => {
      //console.log('Navigation successful:', r);
    });
  }

  /**
   * Opens a confirmation dialog to delete an article.
   * @param _id
   */
  confirmDelete(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete this article?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Delete article with id: ', _id);
        this.globalService.deleteArticle(_id);
      } else {
        console.log('The dialog was closed without confirmation');
      }
    });
  }
}
