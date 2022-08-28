import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chat-info',
  templateUrl: './chat-info.component.html',
  styleUrls: ['./chat-info.component.css']
})
export class ChatInfoComponent implements OnInit {

  constructor(public chatService:ChatService) { }

  ngOnInit(): void {
  }

  ShowChatInformation(){
    this.chatService.ShowChatInfo = !this.chatService.ShowChatInfo
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
}
