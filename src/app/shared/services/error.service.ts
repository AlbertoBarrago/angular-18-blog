import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorsDialogComponent } from '../dialogs/errors/errors-dialog-component';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  modalService = inject(MatDialog);

  openErrorsDialog(errorMessage: string, errorStatus: number) {
    console.log(errorMessage);
    this.modalService.open(ErrorsDialogComponent, {
      data: {
        title: 'Error',
        message: errorMessage,
        status: errorStatus,
      },
    });
  }

  /**
   * Handles the error and displays a message to the user
   * @param httpError
   */
  handleError(httpError: HttpErrorResponse) {
    const errorMessage = httpError.error;
    const errorStatus = httpError.status;
    this.openErrorsDialog(errorMessage, errorStatus);
  }
}
