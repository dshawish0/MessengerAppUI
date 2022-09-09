import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('myProfileDialog') myProfileDialog! :TemplateRef<any>;
  constructor(public chatService :ChatService, private router :Router, public dialog:MatDialog) { 
  }
  userImage:any;
  emailUser:any;
  ngOnInit(): void {
    // const userId = this.LoginService.data.nameid;
    this.chatService.getUser();
    this.chatService.MyProfile(); 
    this.chatService.GetAllChat()
    console.log(this.chatService.myProfile,"ngOnInit NavbarComponent");
  }

  OpenMyProfileDialog(){
    this.dialog.open(this.myProfileDialog, {width:'500px',height:'600px'})
  }
  LockSreen(){
    localStorage.clear();
    localStorage.setItem('UserImg',this.chatService.myProfile.proFileImg);
    localStorage.setItem('FullName',this.chatService.myProfile.fname+" "+this.chatService.myProfile.lname);
    localStorage.setItem('UserEmail',this.chatService.data.email);

    this.router.navigate(['log/lock']);
    
  }
 
}
