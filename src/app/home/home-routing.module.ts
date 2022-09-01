import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutasComponent } from './aboutas/aboutas.component';
import { ContactusComponent } from './contactus/contactus.component';
import { DefultComponent } from './defult/defult.component';

const routes: Routes = [
  {
    path:'',
    component:DefultComponent
  },
  {
    path:'Contactus',
    component:ContactusComponent
  },
  {
    path:'Aboutus',
    component:AboutasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
