import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefultComponent } from './defult/defult.component';

const routes: Routes = [
  {
    path:'',
    component:DefultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
