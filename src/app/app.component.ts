import { Component } from '@angular/core';
import { HomeService } from './Services/home.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MessengerApp';
  constructor(private home:HomeService){
    debugger
    this.home.GetAlltestimonialShow();
  }
  
}
