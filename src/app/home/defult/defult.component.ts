import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-defult',
  templateUrl: './defult.component.html',
  styleUrls: ['./defult.component.css']
})
export class DefultComponent implements OnInit {

  constructor(public home:HomeService) { 
    
  }

  ngOnInit(): void {
   this.home.GetHome();
  }

 
}
