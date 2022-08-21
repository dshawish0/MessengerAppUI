import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(public chat:ChatService, public dialog:MatDialog,) { }

  ngOnInit(): void {
  }

  AcceptFriend(frindid:any){
    console.log(frindid);
    this.chat.AcceptFriend(frindid)
  }

  RejectFriend(frindid:any){
    console.log(frindid);
    this.chat.RejectFriend(frindid);
  }
}
