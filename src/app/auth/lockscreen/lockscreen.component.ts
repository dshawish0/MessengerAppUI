import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {

  password :FormControl= new FormControl('',[Validators.required,Validators.minLength(8)]);
  constructor() { }

  ngOnInit(): void {
  }

  unlock(){
    console.log(this.password.value);
    console.log(localStorage.getItem('username'));
  }

}
