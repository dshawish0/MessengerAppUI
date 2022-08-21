import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import {MatDialog} from '@angular/material/dialog';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';




 
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})


export class SideBarComponent implements OnInit {
@ViewChild('AddFriendDialog') AddFriendDialog! :TemplateRef<any>;
@ViewChild('UpDateChat') UpDateChat! :TemplateRef<any>;


userName = new FormControl('',[Validators.required, Validators.email]);

  constructor(public chat:ChatService, public dialog:MatDialog, public user:UserService) { }
  resl:any=[{}]
  numOfFriend:number=0;
  ngOnInit(): void {
     this.chat.GetAllFrinds();
     this.chat.GetAllChat(1)
  }

  opendDialogAddFriend(){
    this.dialog.open(this.AddFriendDialog, {height:'1000px'});
  }
  
  addFriend(){
    console.log(this.userName.value);
    
    const userObj={
      userName:this.userName.value
    }
    this.chat.AddFriend(userObj);
  }

  AcceptFriend(frindid:any){
    console.log(frindid);
    this.chat.AcceptFriend(frindid)
  }
  Blockuser(frindid:any){
    console.log(frindid);
    this.chat.Blockuser(frindid)
  }
  RejectFriend(frindid:any){
    console.log(frindid);
    this.chat.RejectFriend(frindid);
  }


  createChatForm:FormGroup = new FormGroup({
    GroupName : new FormControl('',Validators.required),
    GroupImg :new FormControl('', Validators.required)
  });

  UploadChatImg(file:any){
    // this.chat.uploadImage(file);
    console.log(file);
    if(file.length==0)
    return ;
    let fileToUpload = <File>file[0];
    const formDate = new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name)
    this.chat.uploadImage(formDate);
  }

  CreateChat(){
    console.log(this.createChatForm.value);
    this.chat.createChat(this.createChatForm.value)
  }


  updateChatForm:FormGroup = new FormGroup({
    GroupName : new FormControl(''),
    GroupImg :new FormControl(''),
    messageGroupId:new FormControl('')
  });

 old_Data:any={};
  opendDialogUpDateChat(messageGroupId1:any, groupName1:any, groupImg1:any){
    this.old_Data={
      messageGroupId : messageGroupId1,
      GroupName : groupName1,
      groupImg : groupImg1
    }
    
    this.updateChatForm.controls['messageGroupId'].setValue(this.old_Data.messageGroupId)
    this.updateChatForm.controls['GroupName'].setValue(this.old_Data.GroupName)
    this.updateChatForm.controls['GroupImg'].setValue(this.old_Data.groupImg)
    this.dialog.open(this.UpDateChat, {height:'600px', width:'500px'});
    console.log(this.old_Data);
    
  }
  upDateChat(){
    console.log(this.updateChatForm.value);
    console.log(this.old_Data);
    this.chat.UpdateChat(this.updateChatForm.value)
  }
}

