import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  email : FormControl=new FormControl('',[Validators.email,Validators.required]);
  constructor() { }
  
  
  ngOnInit(): void {
  }

}
