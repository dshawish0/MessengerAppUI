import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.css']
})
export class ChatInfoComponent implements OnInit {
  @ViewChild('ReportUserDialog') ReportUserDialog! :TemplateRef<any>;
  @ViewChild('AddMemberToChatDialog') AddMemberToChatDialog! :TemplateRef<any>;
  @ViewChild('userProfileDialog') userProfileDialog! :TemplateRef<any>;
  searchFriend:any;
  constructor(public chatService:ChatService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.chatService.GetAllFrinds();
  }

  ShowChatInformation(){
    this.chatService.ShowChatInfo = false
  }

  LeaveFromChat(){
    this.chatService.DeleteChat()
  }

  searchMessage:FormGroup = new FormGroup({
    messageGroupId:new FormControl(''),
    StartDate:new FormControl('',[Validators.required]),
    EndDate:new FormControl('',[Validators.required]),
  })

  SearchMessageDate(messageGroupId:any){
    this.searchMessage.controls['messageGroupId'].setValue(messageGroupId)
    console.log(this.searchMessage.value);
    console.log(this.searchMessage.invalid);
    this.chatService.SearchMessageBetweenDate(this.searchMessage.value)
  }

  reportUserForm:FormGroup = new FormGroup({
    UserReportedId:new FormControl(''),
    ReportText:new FormControl(''),
    User_Id:new FormControl('')
  });

  OpenReportUserDialog(userId:any){
    console.log(userId,'report');
    this.reportUserForm.controls['UserReportedId'].setValue(userId);
    this.dialog.open(this.ReportUserDialog, {width:'400px',height:'600px'});
  }

  ReportUser(){
    this.reportUserForm.controls['User_Id'].setValue(this.chatService.data.nameid), //from Login
    console.log(this.reportUserForm.value,'reportUserForm');
    this.chatService.ReportUser(this.reportUserForm.value);
  }

  myFriend:any[]=[]
  
  OpenAddMemberToChatDialog(){
    var Member:any[]=[]
    Member = this.chatService.groupData[0].groupMembers.map((x:any)=>x.user)
     this.myFriend = this.chatService.myFriend.map((s:any)=>s.user)
    
    this.myFriend = this.myFriend.filter(function(friend){
       return Member.filter(function(member){
          return member.userId == friend.userId;
       }).length == 0
    });
    console.log(this.myFriend,"myFriend");
    console.log(Member,"Member");
    
    this.dialog.open(this.AddMemberToChatDialog,{width:'400px',height:'600px'});
  }
  
  groupMembers:any = []
  select(e:any,userid:any){
    if (e.target.checked === true) {
      let checkedObj = {
        User_Id: userid,
        messageGroupId: this.chatService.groupData[0].messageGroupId,
        joinDate: new Date()
      };
      this.groupMembers.push(checkedObj);
    }
    if (e.target.checked === false) {
      var index: number = this.groupMembers
                    .findIndex((x:any) => x.User_Id === userid);
      console.log(index);
      if (index > -1) {
        this.groupMembers.splice(index, 1);
      }
    }
    console.log(this.groupMembers);
    
  }
  CreateGroupMember(){
    this.chatService.CreateGroupMember(this.groupMembers)
  }

  UserProfile(userId:any){
    console.log("UserProfile", this.chatService.allMemberinMessageGroup);
    
    console.log('UserProfile',userId);
    this.chatService.UserProfile(userId)
    this.dialog.open(this.userProfileDialog,{width:'450px',height:'550px'});
  }

  CloseDialog(){
    this.dialog.closeAll();
  }
}
