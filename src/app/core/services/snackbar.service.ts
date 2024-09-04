import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../../interfaces/app.interfaces';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  router = inject(Router);
  readonly dialog = inject(MatDialog);
  article = signal<Article | null>(null);
  _snackBar = inject(MatSnackBar);

  /**
   * Opens a snackbar with a message and duration set to 3000ms
   * @param message
   */
  openSnackBarWithTimer(message: string) {
    const snackBarRef = this._snackBar.open(message, 'Close', {
      duration: 1800,
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
    });
  }
}
