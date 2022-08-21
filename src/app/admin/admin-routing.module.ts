import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'rep',
    component:ReportComponent
  },
  {
    path:'user',
    component:UsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
