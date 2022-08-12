import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';

const routes: Routes = [
  {
    path:"Chat",
  loadChildren:()=>ChatModule
   },
   {
    path:"",
  loadChildren:()=>HomeModule
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
