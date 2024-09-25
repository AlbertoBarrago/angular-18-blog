import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../../../shared/services/snackbar.service';
import { ErrorService } from '../../../shared/services/error.service';
import { DisplayedColumns, User } from '../../../models/global.models';

@Injectable({ providedIn: 'root' })
export class AdminService {
  readonly http = inject(HttpClient);
  readonly errorService = inject(ErrorService);
  readonly router = inject(Router);
  readonly dialog = inject(MatDialog);
  readonly snackBarService = inject(SnackbarService);
  userList = signal<User[]>([]);
  displayedColumns = signal<DisplayedColumns[]>([]);

  get columnKeys() {
    return this.displayedColumns().map(col => col.key);
  }

  url = {
    users: environment.apiUrl + '/api/users',
  };

  /**
   * Get user list from server
   */
  getUserList() {
    return this.http.get<[User]>(`${this.url.users}`).subscribe({
      next: (data: [User]) => {
        this.userList.set(data);
        this.prepareDisplayedColumns();
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Prepare displayed columns for user list
   */
  prepareDisplayedColumns() {
    if (this.userList().length > 0) {
      const columns = Object.keys(this.userList()[0]).filter(
        key => key !== '_id' && key !== 'password'
      );
      const listOfNewColumns: DisplayedColumns[] = [];
      columns.forEach(el => {
        const newElement = {
          key: el,
          label: el.charAt(0).toUpperCase() + el.slice(1),
        };
        listOfNewColumns.push(newElement);
      });

      listOfNewColumns.push({
        key: 'actions',
        label: 'Actions',
      });

      this.displayedColumns.set(listOfNewColumns);
    }
  }

  /**
   * Create user
   * @param user
   */
  crateUser(user: Partial<User>) {
    this.http.post<User>(`${this.url.users}`, user).subscribe({
      next: () => {
        this.getUserList();
        this.snackBarService.openSnackBarWithTimer('User created');
        this.router.navigate(['/users/users-list']).then(() => null);
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Edit user
   * @param user
   */
  editUser(user: Partial<User>) {
    this.http.patch<User>(`${this.url.users}/${user._id}`, user).subscribe({
      next: () => {
        this.getUserList();
        this.snackBarService.openSnackBarWithTimer('User edited');
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.errorService.handleError(error);
      },
    });
  }

  /**
   * Delete user
   * @param _id
   */
  removeUser(_id: string) {
    this.http.delete<User>(`${this.url.users}/${_id}`).subscribe({
      next: () => {
        this.getUserList();
        this.snackBarService.openSnackBarWithTimer('User removed');
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.handleError(error);
      },
    });
  }
}
