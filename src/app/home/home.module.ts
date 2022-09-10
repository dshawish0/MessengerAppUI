import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DefultComponent } from './defult/defult.component';
import { ChatModule } from '../chat/chat.module';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutasComponent } from './aboutas/aboutas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    DefultComponent,
    TestimonialComponent,
    ContactusComponent,
    AboutasComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    ReactiveFormsModule
    
  ]
})
export class HomeModule { }
