import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient, private router :Router,private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  displayImg:any;

  CreateUser(body:any){
    body.proFileImg=this.displayImg.proFileImg;
    console.log(body.proFileImg);
    this.spinner.show();
    this.http.post('https://localhost:44318/api/user',body).subscribe(
      (resp)=>{
        this.spinner.hide();
        this.toastr.success('Register Complete');
        this.router.navigate(['log/ConfirmEmail']);
    },err =>{
      this.spinner.hide();
      this.toastr.error("can't register now");
    })
  }

  uploadAttachment(file:FormData){
    debugger
    this.spinner.show();
    this.http.post('https://localhost:44318/api/user/upLoadImg',file).subscribe(
      (resp)=>{
        this.displayImg=resp;
        this.spinner.hide();
        this.toastr.success('Upload Image');
    },err =>{
      this.spinner.hide();
      this.toastr.error("can't upload Image now");
    })
  }

  confirmEmail(code:any){
    debugger
    this.http.get('https://localhost:44318/api/user/ConfirmEmail/'+code).subscribe(
      (resp)=>{
        this.spinner.hide();
        this.toastr.success('Confirm Complete');
        this.router.navigate(['log']);
    },err =>{
      this.spinner.hide();
      this.toastr.error("can't Confirm Email");
      this.router.navigate(['log']);
    })
  }


  UpdateVerificationCode(){
    debugger
    this.http.get('https://localhost:44318/api/Login/UpdateVerificationCode').subscribe(
      (resp)=>{
        this.spinner.hide();
        this.toastr.success('Check Your Email');
    },err =>{
      this.spinner.hide();
      this.toastr.error("Somthing Wrong Try Again");
    })
  }
}
