import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Message } from '../types/websocket';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  constructor(private authService: AuthService) {}

  private socket$: WebSocketSubject<Message> = webSocket('ws://localhost:3000/ws');

  authenticate() {
    const token = this.authService.token;
    if (!token) {
      console.warn('Could not send authentication message as no token set');
      return;
    }
    this.socket$.next({ payload: token });
  }

  getMessages(): Observable<string> {
    return this.socket$.pipe(map((msg) => msg.payload));
  }

  sendMessage(msg: string) {
    return this.socket$.next({ payload: msg });
  }

  close() {
    this.socket$.complete();
  }
}
