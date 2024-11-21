import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  template: '<p>Logging out...</p>'
})
export class LogoutComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, (error) => {
      console.error('Error during logout:', error);
    });
  }
}
