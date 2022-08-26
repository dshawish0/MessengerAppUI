import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { BlockComponent } from './block/block.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    SidebarAdminComponent,
    DashboardComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    UsersComponent,
    BlockComponent,
    TestimonialComponent,
    EditProfileComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    
  ],
  exports:[
    SidebarAdminComponent,
    DashboardComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    UsersComponent,
    BlockComponent,
    TestimonialComponent,
    EditProfileComponent,
  ]
})
export class AdminModule { }
