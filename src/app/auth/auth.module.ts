import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { RestPassComponent } from './rest-pass/rest-pass.component';
@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PasswordResetComponent,
    LockscreenComponent,
    ConfirmEmailComponent,
    RestPassComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    
  ]
})
export class AuthModule { }
