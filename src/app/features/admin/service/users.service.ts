import { inject, Injectable } from '@angular/core';
import { DeleteUsersDialogComponent } from '../../../shared/dialogs/users/admin/delete-user/delete-users-dialog-component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from './admin.service';
import { AuthService } from '../../../core/auth/services/auth.service';
import { User } from '../../../shared/interfaces/shared.interfaces';
import { EditUserComponent } from '../../../shared/dialogs/users/admin/edit-user/edit-user.component';

@Injectable({ providedIn: 'root' })
export class UsersService {
  dialog = inject(MatDialog);
  adminService = inject(AdminService);
  authService = inject(AuthService);

  /**
   * Confirm user deletion.
   * @param user
   */
  confirmUserDelete(user: User): void {
    const dialogRef = this.dialog.open(DeleteUsersDialogComponent, {
      width: 'auto',
      data: {
        title: 'Confirm Deletion',
        message: `Are you sure you want to delete this user?`,
        user: user.username,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.removeUser(user._id);
        this.adminService.getUserList();
      }
    });
  }

  /**
   * Open dialog to edit user.
   * @param user
   */
  openEditUserDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: 'auto',
      data: {
        user,
      },
    });

    dialogRef.afterClosed().subscribe(userDataEdited => {
      if (userDataEdited) {
        const editedData = this.updateUser(user, userDataEdited);
        this.adminService.editUser(editedData as User);
        this.adminService.getUserList();
      }
    });
  }

  /**
   * Update user data.
   * @param user
   * @param newData
   */
  updateUser(user: User, newData: Partial<User>) {
    return {
      _id: user._id,
      username: newData.username,
      email: newData.email,
    };
  }
}
