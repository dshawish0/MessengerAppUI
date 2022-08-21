import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-rest-pass',
  templateUrl: './rest-pass.component.html',
  styleUrls: ['./rest-pass.component.css']
})
export class RestPassComponent implements OnInit {
  log :FormGroup= new FormGroup({
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    Repassword: new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  constructor(public login:LoginService) { }

  ngOnInit(): void {
  }

  Rest(){
  this.login.updatePassowrd(this.log.controls["password"].value);
  }

}
