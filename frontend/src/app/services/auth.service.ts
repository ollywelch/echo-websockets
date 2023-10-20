import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { TokenResponse } from '../types/auth';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get token() {
    return localStorage.getItem(environment.tokenKey)
  }

  constructor(private apiService: ApiService, private router: Router) { }

  login(username: string, password: string): Observable<string> {
    const body = `username=${username}&password=${password}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.apiService.post<TokenResponse>('/login', body, headers).pipe(
      map((r) => r.token),
      tap((token) => {
        localStorage.setItem(environment.tokenKey, token);
      })
    );
  }

  logout() {
    localStorage.removeItem(environment.tokenKey);
    this.router.navigate(['login']);
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>(`/users/me`)
  }
}
