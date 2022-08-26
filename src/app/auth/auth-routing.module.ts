import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LoginComponent } from './login/login.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { RegisterComponent } from './register/register.component';
import { RestPassComponent } from './rest-pass/rest-pass.component';

const routes: Routes = [
  {
    path:'',
    component:LoginComponent
  },
  {
  path:'reg',
  component:RegisterComponent
},
{
  path:'respass',
  component:PasswordResetComponent
},
{
  path:'cof',
  component:ConfirmEmailComponent
},
{
  path:'restpass',
  component:RestPassComponent
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
