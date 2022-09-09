import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../payment-dialog/payment-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {
  @ViewChild('Payment') Payment! :TemplateRef<any>;
  constructor(public chat:ChatService,public dialog:MatDialog) { 
  }

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

  PayService(serviceId:any,saleprice:any,servicename:any,){
    this.dialog.open(PaymentDialogComponent)
     environment.serviceId=serviceId;
     environment.saleprice=saleprice;
     environment.servicename=servicename;
  }

}
