import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(public chat:ChatService) { }

  ngOnInit(): void {
  }

}
