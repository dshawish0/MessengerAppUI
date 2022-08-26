import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockComponent } from './block/block.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path:'',
    component:DashboardComponent
  },
  {
    path:'User',
    component:UsersComponent
  },
  {
    path:'Block',
    component:BlockComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
