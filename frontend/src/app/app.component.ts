import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map, switchMap } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'frontend';

  messages: Array<string> = [];
  socket$: WebSocketSubject<string> = webSocket('ws://localhost:3000/ws');

  constructor() {
  }

  ngOnInit(): void {
    this.socket$.subscribe((msg) => this.messages.push(msg))
    this.sendMessages();
  }

  sendMessages() {
    interval(1000).pipe(
      map((i) => this.socket$.next(`message ${i}`))
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.socket$.complete()
  }
}
