import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
})
export class NewUserComponent {
  userForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, email, password } = this.userForm.value;

    const userData = { username, email, password };

    this.AuthService.signup(userData).subscribe(
      () => {
        this.router.navigate(['/users']);
        this.loading = false;
      },
      (error) => {
        console.error('Error adding user:', error);
        this.errorMessage = 'Error adding user';
        this.loading = false;
      }
    );
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
