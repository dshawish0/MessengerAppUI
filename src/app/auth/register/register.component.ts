import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  


  register :FormGroup= new FormGroup({
    Fname: new FormControl('',[Validators.required]),
    Lname: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    RePassword: new FormControl('',[Validators.required,Validators.minLength(8)])

  })

  constructor() {
    
  }
  ngOnInit(): void {
  }

  submit(){

    this.checkValidators();
    console.log(this.register.value);

  }


  checkValidators(){
    const ForFname = document.getElementById('ForFname');
    const ForLname = document.getElementById('ForLname');
    const ForEmail = document.getElementById('ForEmail');
    const ForPassword = document.getElementById('ForPassword');
    const ForRePassward = document.getElementById('ForRePassward');

  if (ForFname != null) {
      // if(this.register.controls['Fname'].hasError('required'))
      //       ForFname.textContent="Required";

      // else
      //     ForFname.textContent="";
           }

  if (ForLname != null) {
    // if(this.register.controls['Lname'].hasError('required'))
    //       ForLname.textContent="Required";

    // else
    //     ForLname.textContent="";
        }

  if (ForEmail != null) {
    // if(this.register.controls['email'].hasError('required'))
    //       ForEmail.textContent="Required";

    // else if(this.register.controls['email'].hasError('email'))
    //       ForEmail.textContent="Email not valid";

    // else
    //       ForEmail.textContent="";
        }
  if (ForPassword != null) {
      if(this.register.controls['password'].hasError('required'))
            ForPassword.textContent="Required";

      else if(this.register.controls['password'].hasError('minLength'))
            ForPassword.textContent="Email not valid";

      else
        ForPassword.textContent="";
          
      }

  if (ForRePassward != null) {
    if(this.register.controls['RePassword'].hasError('required'))
          ForRePassward.textContent="Required";

    else if(this.register.controls['RePassword'].hasError('minLength'))
          ForRePassward.textContent="Email not valid";

    else
      ForRePassward.textContent="";
        
    }
  }

}
