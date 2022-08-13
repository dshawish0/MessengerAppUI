import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  log :FormGroup= new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)])
  })

  
  constructor() { }
  email:any;
  password:any;
  ngOnInit(): void {
    this.email =localStorage.getItem('username');
    this.password=localStorage.getItem('password');
    // alert(this.email);
    // alert(this.password);
  }
  submit(){

    const checkbox = document.getElementById(
      'RemmberMe',
    ) as HTMLInputElement | null;
    
    if (checkbox?.checked) {
        console.log(this.log.value);

        localStorage.setItem('username',this.log.controls["email"].value);
        localStorage.setItem('password',this.log.controls["password"].value);
    }
    
  }

}
