import { Component, effect, inject, OnInit, ViewChild } from '@angular/core';
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
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButton } from '@angular/material/button';
import { UsersService } from '../services/users.service';
import { User } from '../../../../../models/global.models';
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
  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    effect(() => {
      this.dataSource.data = this.userList();
      this.dataSource.sort = this.sort;
    });
  }

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
