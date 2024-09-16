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
  MatTableModule,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { UsersService } from '../services/users.service';
import { User } from '../../../../../shared/interfaces/shared.interfaces';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatSort, MatSortModule } from '@angular/material/sort';

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
    MatIcon,
    RouterLink,
    MatSort,
    MatTableModule,
    MatSortModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  adminService = inject(AdminService);
  userService = inject(UsersService);
  userList = this.adminService.userList;
  displayedColumns = this.adminService.displayedColumns;

  ngOnInit(): void {
    this.adminService.getUserList();
  }

  onEdit(user: User) {
    this.userService.openEditUserDialog(user);
  }

  onDelete(user: User) {
    this.userService.confirmUserDelete(user);
  }
}
