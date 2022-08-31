import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  constructor(public chatService:ChatService) { }
  old_Data:any ={}
  ngOnInit(): void {
    this.old_Data = this.chatService.myProfile;
    console.log("old",this.old_Data);
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
    this.Profile.controls['userId'].setValue(this.old_Data.userId);
    this.Profile.controls['proFileImg'].setValue(this.old_Data.proFileImg);
    this.Profile.controls['gender'].setValue(this.old_Data.gender);
    this.Profile.controls['isActive'].setValue(this.old_Data.isActive);
    this.Profile.controls['isBlocked'].setValue(this.old_Data.isBlocked);
    console.log(this.Profile.value,"formGroup");
    this.chatService.UpDataProfileUser(this.Profile.value);
    
  }
}
