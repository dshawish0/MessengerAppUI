import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments'
import { ChatService } from 'src/app/Services/chat.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.css']
})
export class PaymentDialogComponent implements OnInit {

  constructor(private chat:ChatService) { 
}
name:any;
price:any;
  ngOnInit(): void {
    this.name=environment.servicename;
    this.price=environment.saleprice;
    render({
      id:'#myPaypalButtons',
      currency:'USD',
      value: this.price.toString(),
      onApprove: (details) =>{
        this.chat.PayService(environment.serviceId);
      }
    });
  }

}
