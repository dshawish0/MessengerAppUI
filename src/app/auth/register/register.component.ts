import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/Services/registration.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  detectFiles(event:any){
    this.user.detectFiles(event)
  }

  register :FormGroup= new FormGroup({
    fname: new FormControl('',[Validators.required]),
    lname: new FormControl('',[Validators.required]),
    Email: new FormControl('',[Validators.required,Validators.email]),
    Password: new FormControl('',[Validators.required,Validators.minLength(8)]),
    RePassword: new FormControl('',[Validators.required,Validators.minLength(8)]),
    userName: new FormControl('',[Validators.required]),
    proFileImg: new FormControl('')

  })

  constructor(public user:RegistrationService) {
    
  }
  ngOnInit(): void {

  }

  submit(){
    this.uploadImg()
    setTimeout(()=>{
      this.user.CreateUser(this.register.value);
    }, 3000);
    
    // this.checkValidators();
    // console.log(this.register.value);

  }

  uploadImg(){
    if (this.user.files) {
        
      let fileToUpload = <File>this.user.files[0];
      const formData = new FormData();
      formData.append('file',fileToUpload,fileToUpload.name)
      this.user.uploadAttachment(formData);
      console.log(formData,'formDate');  
  }
    

  }


  // checkValidators(){
  //   const ForFname = document.getElementById('ForFname');
  //   const ForLname = document.getElementById('ForLname');
  //   const ForEmail = document.getElementById('ForEmail');
  //   const ForPassword = document.getElementById('ForPassword');
  //   const ForRePassward = document.getElementById('ForRePassward');

  // if (ForFname != null) {
  //     // if(this.register.controls['Fname'].hasError('required'))
  //     //       ForFname.textContent="Required";

  //     // else
  //     //     ForFname.textContent="";
  //          }

  // if (ForLname != null) {
  //   // if(this.register.controls['Lname'].hasError('required'))
  //   //       ForLname.textContent="Required";

  //   // else
  //   //     ForLname.textContent="";
  //       }

  // if (ForEmail != null) {
  //   // if(this.register.controls['email'].hasError('required'))
  //   //       ForEmail.textContent="Required";

  //   // else if(this.register.controls['email'].hasError('email'))
  //   //       ForEmail.textContent="Email not valid";

  //   // else
  //   //       ForEmail.textContent="";
  //       }
  // if (ForPassword != null) {
  //     if(this.register.controls['password'].hasError('required'))
  //           ForPassword.textContent="Required";

  //     else if(this.register.controls['password'].hasError('minLength'))
  //           ForPassword.textContent="Email not valid";

  //     else
  //       ForPassword.textContent="";
          
  //     }

  // if (ForRePassward != null) {
  //   if(this.register.controls['RePassword'].hasError('required'))
  //         ForRePassward.textContent="Required";

  //   else if(this.register.controls['RePassword'].hasError('minLength'))
  //         ForRePassward.textContent="Email not valid";

  //   else
  //     ForRePassward.textContent="";
        
  //   }
  // }

}
