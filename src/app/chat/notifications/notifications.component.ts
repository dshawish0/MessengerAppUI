import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
    this.chat.GetAllFrinds();
    console.log("NotificationsComponentomponent");
  }

  groupMembers:any = [{User_Id:1}]
  chatAndMember:any;

  createChatForm:FormGroup = new FormGroup({
    GroupName : new FormControl(''),
    GroupImg :new FormControl('')
  });
  
  AcceptFriend(friend:any){
    let checkedObj = {
      User_Id: friend.user.userId,
    };
    this.groupMembers.push(checkedObj);

    this.createChatForm.controls['GroupName'].setValue(friend.user.fname);
    this.createChatForm.controls['GroupImg'].setValue(friend.user.proFileImg);
    this.chatAndMember={messageGroup:this.createChatForm.value, groupMembers:this.groupMembers} 
    this.chat.createChat(this.chatAndMember)
    console.log(this.chatAndMember,"accept");
    console.log(friend);
    this.chat.AcceptFriend(friend.frindid)
  }

  RejectFriend(frindid:any){
    console.log(frindid);
    this.chat.RejectFriend(frindid);
  }

  UnBlock(friendId:any){
    console.log(friendId);
    this.chat.UnBlockFrind(friendId)
  }
}
