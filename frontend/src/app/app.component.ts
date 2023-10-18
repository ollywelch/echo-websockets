import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, switchMap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

interface Message {
  payload: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  messages: Array<Message> = [];
  socket$: WebSocketSubject<Message> = webSocket('ws://localhost:3000/ws');

  constructor() {
  }

  ngOnInit(): void {
    this.socket$.subscribe((msg) => {console.log(msg); this.messages.push(msg)})
    this.sendMessages();
  }

  sendMessages() {
    interval(1000).pipe(
      map((i) => this.socket$.next({payload: `message ${i}`}))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.socket$.complete()
  }
}
