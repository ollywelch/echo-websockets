import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { ApiService } from './api.service';
import { Message } from '../types/websocket';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor(private apiService: ApiService, private router: Router) { }

  messages: Array<Message> = [];
  private hasAuthd = false
  private socket$: WebSocketSubject<Message> = webSocket('ws://localhost:3000/ws');

  getMessages(): Observable<string> {
    return this.socket$.pipe(
      map((msg) => msg.payload),
    )
  }

  sendMessage(msg: string) {
    if (!this.hasAuthd) {
      var token = this.apiService.token
      if (token) {
        this.socket$.next({payload: token})
        this.hasAuthd = true;
      } else {
        this.router.navigate(['login'])
      }
    }
    return this.socket$.next({payload: msg})
  }

}
