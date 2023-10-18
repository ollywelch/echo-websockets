import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  input = '';
  messages: Array<string> = [];
  username?: string;

  constructor(
    private wsService: WebsocketService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.wsService.getMessages().subscribe((msg) => {
      this.messages.push(msg);
    });
    this.userService
      .getCurrentUser()
      .subscribe((user) => (this.username = user.username));
  }

  sendMessage(msg: string) {
    this.wsService.sendMessage(msg);
  }

  // sendMessages() {
  //   interval(1000).pipe(
  //     map((i) => this.wsService.sendMessage(`message ${i}`))
  //   ).subscribe()
  // }
}
