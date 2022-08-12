import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
    // registerform:FormGroup=new FormGroup({
    //   email : new FormControl('', [Validators.required, Validators.email]),
    //   password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    //   confirmpassword: new FormControl('',[Validators.required, Validators.minLength(8)]),
    //   firstname:new FormControl('',[Validators.required]),
    //   lastname:new FormControl('',[Validators.required]),
    //   gender:new FormControl(''),
    //   options:new FormControl(),
    //  // address:new FormControl('',[Validators.required]),
    //   //phoneNumber:new FormControl('')
    // }) 
  }
  ngOnInit(): void {
  }

}
