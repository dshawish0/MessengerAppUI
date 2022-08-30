import { Component, OnInit , Input, OnChanges, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';


interface Message{
  userName:string,
  text:string,
  messageGroupId :string
}

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

  userLoged=this.chatService.data.nameid;

  messages: Message[]=[]
  messDataBase: any[]=[]

connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:44318/chat")
      .build();

  constructor(public chatService:ChatService, public dialog:MatDialog) { 

    this.startConnection();


  }
  messageGroupId:any
  ngOnInit(): void {
    console.log(this.messageGroupId, "chatwithMessage");
     this.messageGroupId=this.messageGroup
    
     this.messageGroupId = this.chatService.id;
     console.log(this.messageGroupId,"ddddddd");
     this.chatService.getGroupMemberByMessageGroupId(this.messageGroupId)
  }



startConnection(){
  this.connection.on("newMessage",(userName: string, text: string)=>{
    this.messages.push({
      text: text,
      userName: userName,
      messageGroupId: this.chatService.id
    });
  });

  this.connection.start();
}



  collapse(){
    this.chatService.collapse = false
  }
  
  ShowChatInformation(){
    this.chatService.ShowChatInfo = !this.chatService.ShowChatInfo
  }
  

messageText:any;
  messageform: FormGroup = new FormGroup({
    text:new FormControl('',[Validators.required]),
    senderId:new FormControl(''),
    messageDate:new FormControl(''),
    messageGroupId:new FormControl('')
  });

  CreateMessage(){

    this.messageform.controls['messageGroupId'].setValue(this.chatService.id);
    this.messageform.controls['senderId'].setValue(this.userLoged);
    this.messageform.controls['messageDate'].setValue(new Date());
    //this.messageform.controls['messageDate'].setValue();

    // this.chatService.CreateMessage(this.messageform.value)
    // this.messageText='';

    //this.messDataBase.push(this.messageform.value)
    // console.log("messageGroupId "+this.messageform.controls['messageGroupId'].value);
    // console.log("senderId "+this.messageform.controls['senderId'].value);
    // console.log("text "+this.messageform.controls['text'].value);
    // console.log(new Date());

    // this.messDataBase.push({
    //   text:this.messageform.controls['text'].value,
    //   senderId:this.messageform.controls['senderId'].value,
    //   messageGroupId:this.messageform.controls['messageGroupId'].value,
    //   messageDate:this.messageform.controls['messageDate'].value
    // });


    // console.log("values"+this.messDataBase.values());
    // console.log("tostring"+this.messDataBase.toString());
    // console.log("free"+this.messDataBase[0].messageDate);
    // console.log("freetostring"+this.messDataBase[0].messageDate.toString());


    this.chatService.CreateMessage(this.messageform.value)

    this.connection.send("newMessage", this.userLoged, this.messageform.controls['text'].value)
        .then(()=>{
          this.messageform.controls['text'].setValue('');
        });
      

  }

  UserProfile(memberId:any){
    console.log("UserProfile", this.chatService.allMemberinMessageGroup);
    
    console.log('UserProfile',memberId);
    this.chatService.UserProfile(memberId)
    this.dialog.open(this.userProfileDialog,{width:'500px',height:'800px'});
  }


}
