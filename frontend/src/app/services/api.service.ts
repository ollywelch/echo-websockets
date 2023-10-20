import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  get<T>(path: string, headers?: HttpHeaders, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${this.baseURL}${path}`, {
      headers: headers,
      params: params
    });
  }

  post<T>(
    path: string,
    payload: any,
    headers?: HttpHeaders,
    params?: HttpParams
  ): Observable<T> {
    return this.http.post<T>(`${this.baseURL}${path}`, payload, {
      headers: headers,
      params: params
    });
  }
}
