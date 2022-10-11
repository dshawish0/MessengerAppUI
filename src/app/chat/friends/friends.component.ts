import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  @ViewChild('AddFriendDialog') AddFriendDialog! :TemplateRef<any>;
  @ViewChild('ReportUserDialog') ReportUserDialog! :TemplateRef<any>;
  @ViewChild('userProfileDialog') userProfileDialog! :TemplateRef<any>;

  userName = new FormControl('',[Validators.required, Validators.email]);
  searchUser:any
  constructor(public chat:ChatService, public dialog:MatDialog) { }


  ngOnInit(): void {
    this.chat.GetAllFrinds();
    console.log("FriendsComponent");
    this.chat.GetAllUser()
  }


  opendDialogAddFriend(){
    this.dialog.open(this.AddFriendDialog, {width:'600px',height:'800px'});
  }
  addFriend(userreceiveId:any){
    
    this.chat.AddFriend(userreceiveId);
  }

  Blockuser(frindid:any){
    console.log(frindid);
    this.chat.Blockuser(frindid)
  }

  reportUserForm:FormGroup = new FormGroup({
    UserReportedId:new FormControl(''),
    ReportText:new FormControl(''),
    User_Id:new FormControl('')
  });

  OpenReportUserDialog(userId:any){
    console.log(userId,'report');
    this.reportUserForm.controls['UserReportedId'].setValue(userId);
    this.dialog.open(this.ReportUserDialog,  {width:'400px',height:'600px'});
  }

  ReportUser(){
    this.reportUserForm.controls['User_Id'].setValue(this.chat.data.nameid), //from Login
    console.log(this.reportUserForm.value,'reportUserForm');
    this.chat.ReportUser(this.reportUserForm.value);
  }


  UserProfile(userId:any){
    console.log(userId,"userIdddddd");
    this.chat.UserProfile(userId);
    this.dialog.open(this.userProfileDialog,{width:'450px',height:'550px'});
  }
  CloseDialog(){
    this.dialog.closeAll()
  }
}
