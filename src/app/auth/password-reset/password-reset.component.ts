import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  email : FormControl=new FormControl('',[Validators.email,Validators.required]);

  constructor(public login:LoginService) { }
  ngOnInit(): void {
  }

  RestPassword(){
    console.log(this.email.valid);
    this.login.RestPassowrd(this.email.value)
  }

}
