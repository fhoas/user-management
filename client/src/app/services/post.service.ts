import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = '/api/listing';

  constructor(private http: HttpClient) {}

  getPostsByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get?userId=${userId}`);
  }

  addPost(post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/get/${id}`);
  }
}
