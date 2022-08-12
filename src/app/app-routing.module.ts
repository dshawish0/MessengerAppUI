import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './chat/chat.module';

const routes: Routes = [
  {
    path:"Chat",
  loadChildren:()=>ChatModule
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
