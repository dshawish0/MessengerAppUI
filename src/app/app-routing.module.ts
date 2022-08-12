import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';



const routes: Routes = [
  {
    path:"Chat",
  loadChildren:()=>ChatModule
   },
   {
    path:"",
  loadChildren:()=>HomeModule
   },
 {
    path:'',
    component:AppComponent
  },
  {
    path:'security',
    loadChildren:()=>AuthModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
