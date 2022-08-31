import { Component, OnInit , Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-chat-with-message',
  templateUrl: './chat-with-message.component.html',
  styleUrls: ['./chat-with-message.component.css']
})
// 
export class ChatWithMessageComponent implements OnInit { 
  @Input() messageGroup:any;
  @ViewChild('userProfileDialog') userProfileDialog! :TemplateRef<any>;
  changelog: string[] = [];

  constructor(public chatService:ChatService, public dialog:MatDialog) { }
  messageGroupId:any
  ngOnInit(): void {
    console.log(this.messageGroupId, "chatwithMessage");
     this.messageGroupId=this.messageGroup
    
     this.messageGroupId = this.chatService.id;
     console.log(this.messageGroupId,"ddddddd");
     this.chatService.getGroupMemberByMessageGroupId(this.messageGroupId)
     console.log("ChatWithMessageComponent");
  }
  collapse(){
    this.chatService.collapse = false
  }
  
  ShowChatInformation(){
    this.chatService.ShowChatInfo = false
  }
  

messageText:any;
  messageform: FormGroup = new FormGroup({
    text:new FormControl('',[Validators.required]),
    senderId:new FormControl(''),
    messageGroupId:new FormControl('')
  });

  CreateMessage(){
    this.messageform.controls['messageGroupId'].setValue(82)
    this.messageform.controls['senderId'].setValue(1)
    console.log(this.messageform.value,"messageform")
    console.log(this.messageform.valid,"valid")

    this.chatService.CreateMessage(this.messageform.value)
 this.messageText='';
  }

  UserProfile(memberId:any){
    console.log("UserProfile", this.chatService.allMemberinMessageGroup);
    
    console.log('UserProfile',memberId);
    this.chatService.UserProfile(memberId)
    this.dialog.open(this.userProfileDialog,{width:'500px',height:'600px'});
  }
}
