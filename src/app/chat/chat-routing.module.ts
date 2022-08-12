import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarchatModule } from '../sidebarchat/sidebarchat.module';
import { ChatemptyComponent } from './chatempty/chatempty.component';
import { IndexComponent } from './index/index.component';


const routes: Routes = [
  
  {
    path:'',
    component:IndexComponent
  },
  {
    path:'sidebar',
    loadChildren:()=>SidebarchatModule
  },
  {
    path:'chatempty',
    component:ChatemptyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
