import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  obj:any;

  constructor(private http:HttpClient, private router :Router,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  data :any;
  submit(email:any,password:any){


    var body ={
      Email :email.toString(),
      Password:password.toString()
    }

const headerDir={
  'Contant-Type':'application/json',
  'Accept':'application/json'
}
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }
    this.spinner.show();
    this.http.post('https://localhost:44318/api/Login',body,requestOptions).subscribe
    ((resp)=>{
      const responce ={
        token:resp.toString()
      }
      localStorage.setItem('token',responce.token);
       this.data= jwt_decode(responce.token);
      console.log(this.data);
      //localStorage.setItem('user',JSON.stringify({...data}) );
      this.spinner.hide();
      if(this.data.role=='admin')
      {
        this.router.navigate(['admin']);
      }
      else if (this.data.role=='user')
      {
        this.router.navigate(['Chat']);
      }
    },err=>{
      this.spinner.hide();
      this.toastr.error('Email or Password Invalid', '', {
        positionClass: 'toast-bottom-center' });
    })



  }

  

  RestPassowrd(email:any){

    var body ={
      Email :email.toString(),
    }

const headerDir={
  'Contant-Type':'application/json',
  'Accept':'application/json'
}
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }
    this.spinner.show();
    this.http.post('https://localhost:44318/api/Login/getLogByEmail',body,requestOptions).subscribe(
      (resp)=>{
        this.spinner.hide();
        this.obj =resp;
        this.toastr.success('Done Reset Password');
        //console.log(this.obj)

        //console.log(JSON.parse(resp.toString()));
        this.router.navigate(['log/PasswordReset']);
        

    },err =>{
      this.spinner.hide();
      this.toastr.error("can't Reset Password");
      this.toastr.error(err.message);
    })

  }

updatePassowrd(password:any){

  var body ={
    loginId:this.obj.loginId,
    Email:this.obj.email,
    Password:password,
    user_Id:this.obj.user_Id,
    roleId:this.obj.roleId,
    userName:this.obj.userName,
    verificationCode:this.obj.verificationCode
  }
  console.log(this.obj.email);
  this.spinner.show();
   this.http.put('https://localhost:44318/api/Login/restPassword/'+this.obj.loginId,body).subscribe(
       (resp)=>{
        this.spinner.hide();
        this.router.navigate(['log']);
        this.toastr.success('Updated Password');

     },err =>{
      console.log("errrrorrrrorororoorr")
      this.spinner.hide();
      this.toastr.error(err.message);
     })
}


ChangeCurrentPassword(userId:any, oldPassword:any, NewPassword:any){

var body={
  userId:userId,
  oldPassword:oldPassword,
  NewPassword:NewPassword
}
this.spinner.show();
this.http.post('https://localhost:44318/api/Login/ChangeCurrentPassword',body).subscribe(
  (resp)=>{
    this.spinner.hide();
    this.toastr.success('Updated Password', '', { positionClass: 'toast-bottom-center' });
},err =>{
  this.spinner.hide();
  this.toastr.error("Somthing Wrong Try Again", '', { positionClass: 'toast-bottom-center' });
})

}


}


