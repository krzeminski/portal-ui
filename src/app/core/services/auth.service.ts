import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  getUserDetails(credentials: Credentials): Observable<any> {
    return this.http.post('/api/auth', credentials);
  }
}

export interface Credentials {
  email: string,
  password: string
}
