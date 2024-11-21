import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;
  showHeader = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.checkRoute();
    });
  }

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  checkRoute(): void {
    const route = this.router.url;
    this.showHeader = !(route === '/login' || route === '/signup');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
