import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatModule } from './chat/chat.module';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AutherizationGuard } from './autherization.guard';



const routes: Routes = [
  {
    path:"",
    loadChildren:()=>ChatModule
   },
   {
    path:"",
    loadChildren:()=>HomeModule
   },
   {
      path:'log',
      loadChildren:()=>AuthModule
   },
   {
    path:'admin',
    loadChildren:()=>AdminModule
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
