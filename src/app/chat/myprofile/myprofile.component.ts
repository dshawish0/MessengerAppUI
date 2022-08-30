import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private LoginService:LoginService, public chatService :ChatService) { }
  emailUser:any;
  ngOnInit(): void {
    this.emailUser = this.LoginService.data.email;
  }

}
