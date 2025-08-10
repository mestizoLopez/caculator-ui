import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'token';
  constructor(private http: HttpClient) {}

  register(username: string, password: string) {
    return this.http.post(`https://calculator-mestizoftware-b8895119c8c6.herokuapp.com/api/v1/auth/register`, { username, password });
  }

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`https://calculator-mestizoftware-b8895119c8c6.herokuapp.com/api/v1/auth/login`, { username, password })
      .pipe(tap(res => {
        const token = res?.token; // adjust if backend uses a different key
        if (token) localStorage.setItem(this.tokenKey, token);
      }));
  }

  registerAndLogin(username: string, password: string) {
    return this.register(username, password).pipe(switchMap(() => this.login(username, password)));
  }

  getToken() { return localStorage.getItem(this.tokenKey); }
  isAuthenticated() { return !!this.getToken(); }
  logout() { localStorage.removeItem(this.tokenKey); }
}
