import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  signupForm!: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  signup(): void {
    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;
    const { username, email, password } = this.signupForm.value;

    const credentials = { username, email, password };

    this.authService.signup(credentials).subscribe(
      () => {
        this.router.navigate(['/login']);
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Error creating account';
        this.loading = false;
      }
    );
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
