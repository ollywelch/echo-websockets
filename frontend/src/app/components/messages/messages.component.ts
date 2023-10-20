import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
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
    this.wsService.authenticate();
    this.userService
      .getCurrentUser()
      .subscribe((user) => (this.username = user.username));
  }

  sendMessage(msg: string) {
    this.wsService.sendMessage(msg);
  }

  ngOnDestroy(): void {
    this.wsService.close();
  }

}
