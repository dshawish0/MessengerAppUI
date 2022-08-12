import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SidebarchatModule } from '../sidebarchat/sidebarchat.module';


@NgModule({
  declarations: [
    NavbarComponent,
    IndexComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SidebarchatModule
  ]
})
export class ChatModule { }
