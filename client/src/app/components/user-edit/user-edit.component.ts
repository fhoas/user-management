import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
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
        });
        this.loading = false;
      },
      (error) => {
        console.error('Error loading user:', error);
        this.loading = false;
      }
    );
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.userService.updateUser(this.userId, this.userForm.value).subscribe(
      () => {
        this.router.navigate(['/users']);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
