import { inject, Injectable } from '@angular/core';
import { ConfirmDeleteDialogComponent } from '../../../shared/dialogs/users/admin/confirmDelete-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from './admin.service';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({ providedIn: 'root' })
export class UsersService {
  dialog = inject(MatDialog);
  adminService = inject(AdminService);
  authService = inject(AuthService);

  /**
   * Confirm user deletion.
   * @param _id
   * @param username
   */
  confirmUserDelete(_id: string, username: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: 'auto',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete this user?`,
        username,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.removeUser(_id);
        this.adminService.getUserList();
      }
    });
  }
}
