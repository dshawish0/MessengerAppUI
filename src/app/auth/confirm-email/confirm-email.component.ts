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
  timeLeftSec: number=0;
  timeLeftMin:number=5;
  interval:any;

  ngOnInit(): void {
    
    this.interval = setInterval(() => {
      if(this.timeLeftSec > 0) {
        this.timeLeftSec--;
      } else {
        if(this.timeLeftMin + this.timeLeftSec ==0){

            const reSend = document.getElementById('resend') as HTMLDivElement | null;
            if(reSend!=null){
                reSend.innerHTML="ReSend";
            }

        }
        else{
        this.timeLeftMin--;
        this.timeLeftSec = 59;
        }
      }
    },1000)

  }
  confirmEmail(){
    console.log(this.code.value);
    this.user.confirmEmail(this.code.value);

  }

   SendCodeAgain(){
    if(this.timeLeftMin + this.timeLeftSec ==0){
    alert("dsadasdsad");
    }
  }
}
