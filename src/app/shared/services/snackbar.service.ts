import { inject, Injectable, signal } from '@angular/core';
import { Article } from '../../models/global.models';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly _snackBar = inject(MatSnackBar);
  article = signal<Article | null>(null);

  /**
   * Opens a snackbar with a message and duration set to 3000ms
   * @param message
   */
  openSnackBarWithTimer(message: string) {
    const snackBarRef = this._snackBar.open(message, 'Close', {
      duration: 1800,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    snackBarRef.afterDismissed().subscribe(() => {
      console.log('Snackbar dismissed');
    });
  }
}
