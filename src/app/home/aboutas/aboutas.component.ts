import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-aboutas',
  templateUrl: './aboutas.component.html',
  styleUrls: ['./aboutas.component.css']
})
export class AboutasComponent implements OnInit {

  constructor(public home:HomeService) { }

  ngOnInit(): void {
    this.home.GetAboutUs();
  }

}
