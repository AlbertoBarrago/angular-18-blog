import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  /**
   * Handles the error and displays a message to the user
   * @param error
   */
  handleError(error: HttpErrorResponse): Error {
    let message;
    switch (error.status) {
      case 400:
        message = 'Bad request';
        break;
      case 403:
        message = 'Forbidden';
        break;
      case 404:
        message = 'Not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
      case 502:
        message = 'Bad gateway';
        break;
      case 401:
        message = 'Unauthorized';
        break;
      default:
        message = error.message;
    }
    return new Error(message, error.error);
  }
}
