import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../interfaces/app.interfaces';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../shared/dialogs/confirm/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from './article.service';
import { UserDialogComponent } from '../shared/dialogs/user/user-dialog-component';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class UtilService {
  readonly router = inject(Router);
  readonly httpService = inject(ArticleService);
  readonly authService = inject(AuthService);
  readonly dialog = inject(MatDialog);
  article = signal<Article | null>(null);

  /**
   * Navigates back to the article view.
   */
  backToArticleView() {
    this.router.navigate(['/articles-list']).then(() => {
      //console.log('Navigation successful:', r);
    });
  }

  /**
   * Opens a confirmation dialog to delete an article.
   * @param _id
   */
  confirmDialogDelete(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete this article?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.httpService.deleteArticle(_id);
      } else {
        console.log('The dialog was closed without confirmation');
      }
    });
  }

  /**
   * Opens an info dialog about user logged in
   */
  userDialogInfo(): void {
    const data = this.authService.getUser();
    this.dialog.open(UserDialogComponent, {
      data,
    });
  }
}
