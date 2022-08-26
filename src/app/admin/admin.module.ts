import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { FooterAdminComponent } from './footer-admin/footer-admin.component';
import { ReportComponent } from './report/report.component';
import { SharedModule } from '../shared/shared.module';
import { UsersComponent } from './users/users.component';
import { BlockComponent } from './block/block.component';

@NgModule({
  declarations: [
    SidebarAdminComponent,
    DashboardComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    ReportComponent,
    UsersComponent,
    BlockComponent
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
    
  ],
  exports:[
    UsersComponent,
    SidebarAdminComponent,
    DashboardComponent,
    NavbarAdminComponent,
    FooterAdminComponent,
    ReportComponent,
    UsersComponent,
    BlockComponent
  ]
})
export class AdminModule { }
