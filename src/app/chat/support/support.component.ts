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
    console.log("SupportComponent");
  }

  UserActive(e:any,userId:any){
    if(e.target.checked==true){
      console.log(userId,'true');
    }
    else{
      console.log(userId,'false');
    }
  }

}
