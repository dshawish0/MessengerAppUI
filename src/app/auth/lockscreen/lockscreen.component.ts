import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-lockscreen',
  templateUrl: './lockscreen.component.html',
  styleUrls: ['./lockscreen.component.css']
})
export class LockscreenComponent implements OnInit {

  password :FormControl= new FormControl('',[Validators.required]);
  img:any;
  FullName:any;
  Email:any;

  constructor(private login:LoginService) { 
     this.img =localStorage.getItem('UserImg');
    this.FullName =localStorage.getItem('FullName');
     this.Email =localStorage.getItem('UserEmail');
  }

  ngOnInit(): void {
    
  }

  unlock(){
    this.login.submit(this.Email,this.password.value)
  }

}
