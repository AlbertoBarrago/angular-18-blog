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
   * @param _id
   * @param username
   */
  confirmUserDelete(_id: string, username: string): void {
    const dialogRef = this.dialog.open(DeleteUsersDialogComponent, {
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

  openEditUserDialog(user: User) {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: 'auto',
      data: {
        user,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const editedData = this.updateUser(user, result);
        this.adminService.editUser(editedData as User);
        this.adminService.getUserList();
      }
    });
  }

  updateUser(user: User, newData: Partial<User>) {
    const updatedUser = {
      _id: user._id,
      username: newData.username,
      email: newData.email,
    };
    return updatedUser;
  }
}
