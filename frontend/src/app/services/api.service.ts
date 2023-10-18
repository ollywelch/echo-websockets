import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseURL = 'http://localhost:3000'
  token?: string

  constructor(private http: HttpClient) { }

  private constructHeaders(headers?: HttpHeaders) {
    if (this.token) {
      if (!headers) {
        headers = new HttpHeaders()
      }
      headers = headers.append("Authorization", `Bearer ${this.token}`)
    }
    return headers
  }

  get<T>(path: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    headers = this.constructHeaders(headers)
    return this.http.get<T>(`${this.baseURL}${path}`, {headers: headers, params: params})
  }

  post<T>(path: string, payload: any, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    headers = this.constructHeaders(headers)
    return this.http.post<T>(`${this.baseURL}${path}`, payload, {headers: headers, params: params})
  }

}
