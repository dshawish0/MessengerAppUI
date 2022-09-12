import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';
import { LoginService } from 'src/app/Services/login.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels } from '@techiediaries/ngx-qrcode';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  constructor(public chatService:ChatService, private login:LoginService, private router:Router, public dialog:MatDialog) { }
  // old_Data:any;
  ngOnInit(): void {
    // this.old_Data = this.chatService.myProfile;
    console.log("old",this.chatService.old_Data);
    console.log("SettingComponent");
  }



  elementType=NgxQrcodeElementTypes.URL;
  corectionLevel=NgxQrcodeErrorCorrectionLevels.HIGH;
  value = 'www.google.com'


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

  detectFiles(event:any){
    this.chatService.detectFiles(event)
  }

  uplodeImgProfile(){
    if (this.chatService.files) {
        
      let fileToUpload = <File>this.chatService.files[0];
      const formData = new FormData();
      formData.append('file',fileToUpload,fileToUpload.name)
      this.chatService.uplodeImageForProfileUser(formData);
      console.log(formData,'formDate');  
    }
  }

  upDateProfile(){
    this.Profile.controls['userId'].setValue(this.chatService.old_Data.userId);
    this.Profile.controls['proFileImg'].setValue(this.chatService.old_Data.proFileImg);
    this.Profile.controls['gender'].setValue(this.chatService.old_Data.gender);
    this.Profile.controls['isActive'].setValue(this.chatService.old_Data.isActive);
    this.Profile.controls['isBlocked'].setValue(this.chatService.old_Data.isBlocked);
    console.log(this.Profile.value,"formGroup");
    this.uplodeImgProfile();
    setTimeout(()=>{
      this.chatService.UpDataProfileUser(this.Profile.value);
  }, 3000);
    
    
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
  @ViewChild('QRCode') QRCode! :TemplateRef<any>;
  GenerateQR(){
    // alert("Deiaa is hereeeeee");
    this.dialog.open(this.QRCode,  {width:'250px',height:'300px'});
  }
}
