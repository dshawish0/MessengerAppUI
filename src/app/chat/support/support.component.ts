import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(public chat:ChatService) { }

  ngOnInit(): void {
    this.chat.GetAllPaymentsByUserId();
    this.chat.GetAllServices();
    console.log("SupportComponent");
  }

  UserActive(e:any,user:any){
    if(e.target.checked==true){
      user.isActive=1;
      this.chat.UserActive(user);
      console.log(user,'true');
    }
    else{
      user.isActive=0;
      console.log(user,'false');
      this.chat.UserActive(user);
    }
  }

  PayService(serviceId:any){
    this.chat.PayService(serviceId);
  }

}
