import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SidebarchatModule } from '../sidebarchat/sidebarchat.module';
import { ChatemptyComponent } from './chatempty/chatempty.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NavbarComponent,
    IndexComponent,
    SideBarComponent,
    ChatemptyComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    SidebarchatModule,
    HttpClientModule,
    SharedModule,
    MatDialogModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,
    IndexComponent,
    SideBarComponent,
    ChatemptyComponent
  ]
})
export class ChatModule { }
