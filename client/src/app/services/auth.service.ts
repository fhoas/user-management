import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { email, password });
  }

  logout(): Observable<any> {
    return this.http.get(`${this.apiUrl}/signout`);
  }  

  signup(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }
}
