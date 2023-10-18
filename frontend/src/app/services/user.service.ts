import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { User, UserCreate } from '../types/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService: ApiService) { }

  createUser(user: UserCreate): Observable<User> {
    return this.apiService.post<User>('/users', user)
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>('/users/me')
  }
}
