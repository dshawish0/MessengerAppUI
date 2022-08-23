import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient, private router :Router) { }

  displayImg:any;

  CreateUser(body:any){
    body.proFileImg=this.displayImg.proFileImg;
    console.log(body.proFileImg);
    this.http.post('https://localhost:44318/api/user',body).subscribe(
      (resp)=>{
        this.router.navigate(['log/ConfirmEmail']);
    },err =>{

    })
  }

  uploadAttachment(file:FormData){
    debugger
    this.http.post('https://localhost:44318/api/user/upLoadImg',file).subscribe(
      (resp)=>{
        this.displayImg=resp;

    },err =>{

    })
  }

  confirmEmail(code:any){
    this.http.get('https://localhost:44318/api/user/ConfirmEmail/'+code).subscribe(
      (resp)=>{
        this.router.navigate(['log']);
    },err =>{

    })
  }
}
