import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, map, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenResponse } from '../types/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiService: ApiService) {}

  login(username: string, password: string): Observable<string> {
    const body = `username=${username}&password=${password}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.apiService.post<TokenResponse>('/login', body, headers).pipe(
      map((r) => r.token),
      tap((token) => {
        this.apiService.token = token;
      })
    );
  }
}
