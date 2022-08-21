import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllChatComponent } from './all-chat/all-chat.component';
import { ChatWithMessageComponent } from './chat-with-message/chat-with-message.component';
import { ChatemptyComponent } from './chatempty/chatempty.component';
import { CreateChatComponent } from './create-chat/create-chat.component';
import { FriendsComponent } from './friends/friends.component';
import { IndexComponent } from './index/index.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SettingComponent } from './setting/setting.component';
import { SupportComponent } from './support/support.component';


const routes: Routes = [
  {
    path:'Friend',
    component:FriendsComponent
  },
  {
    path:'Index',
    component:IndexComponent
  },

  {
    path:'chatempty',
    component:ChatemptyComponent
  },
  {
    path:'defult',
    component:ChatWithMessageComponent
  },
  {
    path:'',
    component:CreateChatComponent
  },
  {
    path:'AllChat',
    component:AllChatComponent
  },
  {
    path:'Notifications',
    component:NotificationsComponent
  },
  {
    path:'Support',
    component:SupportComponent
  },
  {
    path:'Setting',
    component:SettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
