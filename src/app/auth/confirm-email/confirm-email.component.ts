import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/Services/registration.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent implements OnInit {
  code : FormControl=new FormControl('',Validators.required);
  constructor(public user:RegistrationService) { }

  ngOnInit(): void {
  }
  confirmEmail(){
    console.log(this.code.value);
    this.user.confirmEmail(this.code.value);
  }
}
