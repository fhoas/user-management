import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  total = 0;
  filteredTotal = 0;
  loading = true;
  pageSize = 7;
  pageIndex = 1;
  searchTerm: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers(1, 1000).subscribe(
      (data) => {
        this.users = data;
        this.total = this.users.length;
        this.filteredUsers = this.users;
        this.filteredTotal = this.users.length;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading users:', error);
        this.loading = false;
      }
    );
  }

  onSearchChange(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredUsers = this.users;
      this.filteredTotal = this.users.length;
    } else {
      const lowerCaseSearchTerm = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          user.username.toLowerCase().includes(lowerCaseSearchTerm) ||
          user.email.toLowerCase().includes(lowerCaseSearchTerm)
      );
      this.filteredTotal = this.filteredUsers.length;
    }
    this.pageIndex = 1;
  }

  get paginatedUsers(): any[] {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    return this.filteredUsers.slice(startIndex, startIndex + this.pageSize);
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
  }

  onPageSizeChange(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageIndex = 1;
  }

  editUser(userId: string): void {
    this.router.navigate([`/user/${userId}`]);
  }

  viewUser(userId: string): void {
    this.router.navigate([`/user/${userId}`]);
  }

  deleteUser(userId: any): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.users = this.users.filter((user) => user._id !== userId);
        this.onSearchChange();
        console.log('User deleted:', userId);
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
