import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chatempty',
  templateUrl: './chatempty.component.html',
  styleUrls: ['./chatempty.component.css']
})
export class ChatemptyComponent implements OnInit {

  constructor(public chatService:ChatService) { }

  ngOnInit(): void {
    console.log("chatempty",this.chatService.AllMessage);
    
  }

  GetAllMessage(messageGroup_id:any){
    console.log("GetAllMessage",messageGroup_id);
    
  }

  updateChat:FormGroup = new FormGroup({
    GroupName : new FormControl('',Validators.required),
    GroupImg :new FormControl('', Validators.required)
  });

  upDateChat(){
    console.log(this.updateChat.value); 
  }

  messageText:any;
  messageform: FormGroup = new FormGroup({
    text:new FormControl('',[Validators.required]),
    senderId:new FormControl(''),
    messageGroupId:new FormControl('')
  });

  CreateMessage(){
    this.messageform.controls['messageGroupId'].setValue(this.chatService.id)
    this.messageform.controls['senderId'].setValue(1)
    console.log(this.messageform.value,"messageform")
    console.log(this.messageform.valid,"valid")

    this.chatService.CreateMessage(this.messageform.value)
 this.messageText='';
  }
}
