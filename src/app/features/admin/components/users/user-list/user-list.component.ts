import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../service/admin.service';
import { DatePipe, JsonPipe, NgForOf, NgIf } from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { UsersService } from '../../../service/users.service';
import { User } from '../../../../../shared/interfaces/shared.interfaces';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    JsonPipe,
    MatTable,
    MatColumnDef,
    NgForOf,
    MatHeaderCell,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatHeaderRow,
    MatButton,
    NgIf,
    DatePipe,
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  adminService = inject(AdminService);
  userService = inject(UsersService);
  userList = this.adminService.userList;
  displayedColumns = this.adminService.displayedColumns;

  ngOnInit(): void {
    this.adminService.getUserList();
  }

  onEdit(row: User) {
    console.log('Editing row: ', row);
  }

  onDelete(row: User) {
    this.userService.confirmUserDelete(row._id, row.username);
  }
}
