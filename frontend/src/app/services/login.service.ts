import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenResponse } from '../types/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private apiService: ApiService) { }

  login(username: string, password: string): Observable<string> {
    var body = `username=${username}&password=${password}`
    var headers = new HttpHeaders({"Content-Type": "application/x-www-form-urlencoded"})
    return this.apiService.post<TokenResponse>('/login', body, headers).pipe(
      map((r) => r.token),
      tap((token) => {this.apiService.token = token; console.log(this.apiService.token);}),
      catchError((err: any, _: Observable<string>) => {
        console.error(err)
        return of("")
      })
    )
  }

}
