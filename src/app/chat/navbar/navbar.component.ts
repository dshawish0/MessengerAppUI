import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public chatService :ChatService, private router :Router) { }
  userImage:any;
  emailUser:any;
  ngOnInit(): void {

    // const userId = this.LoginService.data.nameid;
    this.chatService.getUser();
    this.chatService.MyProfile(); 
    this.chatService.GetAllChat()
  }

  LockSreen(){
    localStorage.clear();
    localStorage.setItem('UserImg',this.chatService.myProfile.proFileImg);
    localStorage.setItem('FullName',this.chatService.myProfile.fname+" "+this.chatService.myProfile.lname);
    localStorage.setItem('UserEmail',this.chatService.data.email);

    this.router.navigate(['log/lock']);
    
  }
 
}
