import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(usernameVoice: string, passwordVoice: string): Observable<any> {
    return this.http.post(`${this.API}/register`, {
      usernameVoice,
      passwordVoice
    });
  }

  login(usernameVoice: string, passwordVoice: string): Observable<any> {
    return this.http.post(`${this.API}/login`, {
      usernameVoice,
      passwordVoice
    });
  }
}