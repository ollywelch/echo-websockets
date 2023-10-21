import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from '../core/services/websocket.service';
import { UserService } from '../core/services/user.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit, OnDestroy {
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
