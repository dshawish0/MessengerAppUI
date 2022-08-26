import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockComponent } from './block/block.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportComponent } from './report/report.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'vvvv',
    component:ReportComponent
  },
  {
    path:'user',
    component:UsersComponent
  },
  {
    path:'Block',
    component:BlockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
