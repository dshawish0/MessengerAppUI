import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DefultComponent } from './defult/defult.component';
import { ChatModule } from '../chat/chat.module';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    DefultComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    
  ]
})
export class HomeModule { }
