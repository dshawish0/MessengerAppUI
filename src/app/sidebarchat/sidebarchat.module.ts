import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarchatRoutingModule } from './sidebarchat-routing.module';
import { CreatechatComponent } from './createchat/createchat.component';
import { FriendsComponent } from './friends/friends.component';



@NgModule({
  declarations: [
    CreatechatComponent,
    FriendsComponent
  ],
  imports: [
    CommonModule,
    SidebarchatRoutingModule,
    
  ],
  exports:[
    SidebarchatRoutingModule,
    CreatechatComponent,
    FriendsComponent
  ]
})
export class SidebarchatModule { }
