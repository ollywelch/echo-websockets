import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, map } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';

interface Message {
  payload: string;
}
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJPbGx5IiwiZXhwIjoxNjk3NjU1Nzc5fQ.EgZxBFVTYS84RAqDNYuYXodKeyAYVQ71B4u59WOPpIc'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {

  messages: Array<Message> = [];
  socket$: WebSocketSubject<Message> = webSocket('ws://localhost:3000/ws');

  constructor() {
  }

  ngOnInit(): void {
    this.socket$.subscribe((msg) => {console.log(msg); this.messages.push(msg)})
    this.socket$.next({payload: token})
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
