import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(public chatService :ChatService, private router:Router) { }
  emailUser:any;
  ngOnInit(): void {

    this.emailUser = this.chatService.data.email;

  }
  logout(){
    this.chatService.logout(this.chatService.data.nameid);
    localStorage.clear();
    this.router.navigate(['']);
  }

}
