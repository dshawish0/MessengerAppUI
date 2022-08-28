import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

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
import { AddServicesComponent } from './add-services/add-services.component';
import { ReportComponent } from './report/report.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

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
    AddServicesComponent,
    ReportComponent,
    HomeComponent,
    FooterComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,  
    
  ],
  exports:[
    UsersComponent,
    SidebarAdminComponent,
    DashboardComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    UsersComponent,
    BlockComponent,
    TestimonialComponent,
    EditProfileComponent,
    AddServicesComponent,
    ReportComponent,
    HomeComponent,
    FooterComponent,
  ]
})
export class AdminModule { }
