import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = '/api/user';

  constructor(private http: HttpClient) {}

  getUsers(pageIndex: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update/${id}`, userData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  addUser(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  } 

  getListingsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/listings/${userId}`);
  }
}
