import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { ChatemptyComponent } from './chatempty/chatempty.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { CreateChatComponent } from './create-chat/create-chat.component';
import { FriendsComponent } from './friends/friends.component';
import { AllChatComponent } from './all-chat/all-chat.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SupportComponent } from './support/support.component';
import { SettingComponent } from './setting/setting.component';
import { ChatWithMessageComponent } from './chat-with-message/chat-with-message.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { PaymentDialogComponent } from './payment-dialog/payment-dialog.component';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  declarations: [
    NavbarComponent,
    IndexComponent,
    ChatemptyComponent,
    CreateChatComponent,
    FriendsComponent,
    AllChatComponent,
    NotificationsComponent,
    SupportComponent,
    SettingComponent,
    ChatWithMessageComponent,
    MyprofileComponent,
    ChatInfoComponent,
    PaymentDialogComponent
    
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgxQRCodeModule,
    FormsModule,
    
  ],
})
export class ChatModule { 
}
