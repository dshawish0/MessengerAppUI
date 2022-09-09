import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(public chatService :ChatService, private router:Router, public dialog:MatDialog) { }
  emailUser:any;
  ngOnInit(): void {
    this.emailUser = this.chatService.data.email;
  }

  logout(){
    this.chatService.logout(this.chatService.data.nameid);
    localStorage.clear();
    this.dialog.closeAll();
    this.router.navigate(['']);
  }

  CloseDialog(){
    this.dialog.closeAll();
  }

}
