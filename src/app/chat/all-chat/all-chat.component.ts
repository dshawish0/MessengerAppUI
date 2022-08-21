import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/Services/chat.service';


@Component({
  selector: 'app-all-chat',
  templateUrl: './all-chat.component.html',
  styleUrls: ['./all-chat.component.css']
})
export class AllChatComponent implements OnInit {
  @ViewChild('UpDateChat') UpDateChat! :TemplateRef<any>;
  currentItem:any;

  constructor(public chatService:ChatService, public dialog:MatDialog) { }

  ngOnInit(): void {
    this.chatService.GetAllChat(1)
    
    
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
    this.chatService.UpdateChat(this.updateChatForm.value)
  }
 

  UploadChatImg(file:any){
    // this.chat.uploadImage(file);
    console.log(file);
    if(file.length==0)
    return ;
    let fileToUpload = <File>file[0];
    const formDate = new FormData();
    formDate.append('file',fileToUpload,fileToUpload.name)
    this.chatService.uploadImage(formDate);
  }

  
  MessageChat(messageGroupId:any){
    // this.currentItem=messageGroupId;
    // console.log("messageGroupId",this.currentItem);
    this.chatService.MessageChat(messageGroupId)
    // this.route.navigate([''])
  }
  test(){
    this.chatService.MessageChat(1)
  }
}
