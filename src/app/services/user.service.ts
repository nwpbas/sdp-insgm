import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  DJANGO_SERVER: string = "http://localhost:8000";

  constructor(
    private http: HttpClient,
  ) { }

  public upload(formData) {
    return this.http.post<any>(`${this.DJANGO_SERVER}/api/posts/`, formData);
  }
}
