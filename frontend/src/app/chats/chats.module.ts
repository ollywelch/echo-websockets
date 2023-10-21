import { NgModule } from '@angular/core';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatsComponent } from './chats.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChatsComponent],
  imports: [ChatsRoutingModule, SharedModule]
})
export class ChatsModule {}
