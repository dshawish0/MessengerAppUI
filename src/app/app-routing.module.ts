import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutherizationGuard } from './autherization.guard';


const routes: Routes = [
  {
    path:"Chat",
    loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule),
    canActivate:[AutherizationGuard]
   },
   {
    path:"",
    loadChildren:()=>import('./home/home.module').then(m => m.HomeModule),
   },
   {
      path:'log',
      loadChildren:()=> import('./auth/auth.module').then(m => m.AuthModule),
   },
   {
    path:'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate:[AutherizationGuard]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
