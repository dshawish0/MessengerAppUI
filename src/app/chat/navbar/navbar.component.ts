import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public chatService :ChatService) { }
  userImage:any;
  emailUser:any;
  ngOnInit(): void {

    // const userId = this.LoginService.data.nameid;
    this.chatService.getUser();
    this.chatService.MyProfile(this.chatService.data.nameid); 

  }
 
}
