import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import {MatDialog} from '@angular/material/dialog';
import { EmailValidator, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';



 
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})


export class SideBarComponent implements OnInit {
@ViewChild('AddFriendDialog') AddFriendDialog! :TemplateRef<any>;

userName = new FormControl('',[Validators.required, Validators.email]);

  constructor(public chat:ChatService, public dialog:MatDialog, public user:UserService) { }
  resl:any=[{}]
  numOfFriend:number=0;
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

}

