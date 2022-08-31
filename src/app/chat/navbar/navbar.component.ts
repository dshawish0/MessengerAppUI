import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private LoginService:LoginService, public chatService :ChatService) { }
  userImage:any;
  emailUser:any;
  ngOnInit(): void {
    const userId = this.LoginService.data.nameid;
    this.emailUser = this.LoginService.data.email
    this.chatService.MyProfile(userId); 
    console.log("NavbarComponent");
    
  }
 
}
