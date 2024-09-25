import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../../models/global.models';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../dialogs/confirm/confirm-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { ArticleService } from '../../features/articles/services/article.service';
import { UserDialogComponent } from '../dialogs/users/info/user-dialog-component';
import { AuthService } from '../../features/auth/services/auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class UtilService {
  readonly router = inject(Router);
  readonly articleService = inject(ArticleService);
  readonly authService = inject(AuthService);
  readonly dialog = inject(MatDialog);
  readonly snackBarService = inject(SnackbarService);
  article = signal<Article | null>(null);

  /**
   * Navigates back to the article view.
   */
  backToArticleView() {
    this.router.navigate(['/articles/articles-list']).then(() => {
      //console.log('Navigation successful:', r);
    });
  }

  /**
   * Navigates back to the article view.
   */
  backToUserView() {
    this.router.navigate(['/users/users-list']).then(() => {
      //console.log('Navigation successful:', r);
    });
  }

  /**
   * Opens a confirmation dialog to delete an article.
   * @param _id
   */
  confirmArticleDelete(_id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete this article?`,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.articleService.deleteArticle(_id);
        this.snackBarService.openSnackBarWithTimer(
          'Article deleted successfully'
        );
        this.backToArticleView();
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
