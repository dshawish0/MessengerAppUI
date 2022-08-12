import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarchatModule } from '../sidebarchat/sidebarchat.module';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'sidebar',
    loadChildren:()=>SidebarchatModule
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
