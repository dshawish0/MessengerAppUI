import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'Login',
    component:LoginComponent
  },
  {
  path:'Register',
  component:RegisterComponent
},
{
  path:'Passrest',
  component:PasswordResetComponent
},
{
  path:'lock',
  component:LockscreenComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
