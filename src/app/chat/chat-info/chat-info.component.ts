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

  constructor(public chatService:ChatService, public dialog:MatDialog) { }

  ngOnInit(): void {
    console.log("ChatInfoComponent");
  }

  ShowChatInformation(){
    this.chatService.ShowChatInfo = false
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
    this.dialog.open(this.ReportUserDialog, {width:'500px'});
  }

  ReportUser(){
    this.reportUserForm.controls['User_Id'].setValue(1), //from Login
    console.log(this.reportUserForm.value,'reportUserForm');
    this.chatService.ReportUser(this.reportUserForm.value);
  }
  CloseReportDialog(){
    this.dialog.closeAll();
  }
}
