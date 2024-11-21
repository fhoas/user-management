import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent implements OnInit {
  userId!: any;
  userForm: FormGroup;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: [''],
      email: [''],
      role: [''],
      createdAt: [''],
      updatedAt: [''],
    });
  }

  ngOnInit(): void {
    const userIdParam = this.route.snapshot.paramMap.get('id');
    if (userIdParam) {
      this.userId = userIdParam;
      this.loadUser();
    }
  }

  loadUser(): void {
    this.userService.getUserById(this.userId).subscribe(
      (user) => {
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: new Date(user.createdAt).toLocaleString(),
          updatedAt: new Date(user.updatedAt).toLocaleString(),
        });
        this.userForm.disable();
        this.loading = false;
      },
      (error) => {
        console.error('Error loading user:', error);
        this.loading = false;
      }
    );
  }

  saveUser(): void {
    if (this.userId === 0) {
      this.userService.addUser(this.userForm.value).subscribe(
        () => this.router.navigate(['/users']),
        (error: any) => console.error('Error creating user:', error)
      );
    } else {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(
        () => this.router.navigate(['/users']),
        (error: any) => console.error('Error updating user:', error)
      );
    }
  }
}
