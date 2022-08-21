import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

  constructor(public chatService:ChatService) { }

  ngOnInit(): void {
  }

  

}
