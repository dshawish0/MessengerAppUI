import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(public chatService:ChatService, private login:LoginService, private router:Router) { }
  // old_Data:any;
  ngOnInit(): void {
    // this.old_Data = this.chatService.myProfile;
    console.log("old",this.chatService.old_Data);
    console.log("SettingComponent");
  }
  Profile:FormGroup= new FormGroup({
    userId:new FormControl(''),
    fname : new FormControl('',[Validators.required]),
    lname:new FormControl('',[Validators.required]),
    userName:new FormControl('',[Validators.required]),
    gender:new FormControl(''),
    isActive:new FormControl(''),
    isBlocked:new FormControl(''),
    proFileImg:new FormControl(''),
    userBio:new FormControl('',)
  });


  ChangeCurrentPassword :FormGroup= new FormGroup({
    oldPassword: new FormControl('',[Validators.required]),
    NewPassowrd: new FormControl('',[Validators.required,Validators.minLength(8)]),
    ReNewPassowrd: new FormControl('',[Validators.required,Validators.minLength(8)])
  });

  uplodeImgProfile(file:any){
    console.log(file,'Img');
    if(file.length==0)
    return ;
    let fileToUpload = <File>file[0];
    const formDate = new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name)
    this.chatService.uplodeImageForProfileUser(formDate);
  }

  upDateProfile(){
    this.Profile.controls['userId'].setValue(this.chatService.old_Data.userId);
    this.Profile.controls['proFileImg'].setValue(this.chatService.old_Data.proFileImg);
    this.Profile.controls['gender'].setValue(this.chatService.old_Data.gender);
    this.Profile.controls['isActive'].setValue(this.chatService.old_Data.isActive);
    this.Profile.controls['isBlocked'].setValue(this.chatService.old_Data.isBlocked);
    console.log(this.Profile.value,"formGroup");
    this.chatService.UpDataProfileUser(this.Profile.value);
    
  }
data:any
  ChangeCurrPass(){
    let token = localStorage.getItem('token');
    if(token !=null){
       this.data= jwt_decode(token);

      this.login.ChangeCurrentPassword(this.data.nameid,this.ChangeCurrentPassword.controls["oldPassword"].value,
      this.ChangeCurrentPassword.controls["NewPassowrd"].value)
    }
    
  }
  logout(){
    this.chatService.logout(this.chatService.data.nameid);
    localStorage.clear();
    this.router.navigate(['']);
  }
  Text : FormControl=new FormControl('',Validators.required);
  sendTest(){
    this.chatService.SendTest(this.Text);
  }
}
