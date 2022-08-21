import { Component, OnInit , Input} from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chat-with-message',
  templateUrl: './chat-with-message.component.html',
  styleUrls: ['./chat-with-message.component.css']
})
export class ChatWithMessageComponent implements OnInit {
  // @Input() item:any;
  constructor(public chatService:ChatService) { }

  ngOnInit(): void {
    
  }

}
