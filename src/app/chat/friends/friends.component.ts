import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  @ViewChild('AddFriendDialog') AddFriendDialog! :TemplateRef<any>;

  userName = new FormControl('',[Validators.required, Validators.email]);

  constructor(public chat:ChatService, public dialog:MatDialog) { }


  ngOnInit(): void {
    this.chat.GetAllFrinds();
  }


  opendDialogAddFriend(){
    this.dialog.open(this.AddFriendDialog, {height:'1000px'});
  }
  addFriend(){
    console.log(this.userName.value);
    
    const userObj={
      userName:this.userName.value
    }
    this.chat.AddFriend(userObj);
  }

  Blockuser(frindid:any){
    console.log(frindid);
    this.chat.Blockuser(frindid)
  }
}
