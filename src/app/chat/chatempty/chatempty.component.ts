import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-chatempty',
  templateUrl: './chatempty.component.html',
  styleUrls: ['./chatempty.component.css']
})
export class ChatemptyComponent implements OnInit {

  @ViewChild('ChatInfo') ChatInfo! :TemplateRef<any>;


  constructor(public chatService:ChatService,  public dialog:MatDialog) { 
     
  }
  imageSrc: any=[];

  ngOnInit(): void {
    
  }

  collapse(){
    this.chatService.collapse = false
  }

  handleFileInput(e:any){
    console.log(e);
    
  }

  GetAllMessage(messageGroup_id:any){
    console.log("GetAllMessage",messageGroup_id);
    
  }

  updateChat:FormGroup = new FormGroup({
    GroupName : new FormControl('',Validators.required),
    GroupImg :new FormControl('', Validators.required)
  });

  upDateChat(){
    console.log(this.updateChat.value); 
  }

  messageText:any;
  messageform: FormGroup = new FormGroup({
    text:new FormControl('',[Validators.required]),
    senderId:new FormControl(''),
    messageGroupId:new FormControl('')
  });

  CreateMessage(){
    this.messageform.controls['messageGroupId'].setValue(this.chatService.id)
    this.messageform.controls['senderId'].setValue(1)
    console.log(this.messageform.value,"messageform")
    console.log(this.messageform.valid,"valid")

    this.chatService.CreateMessage(this.messageform.value)
 this.messageText='';
  }

  chatInfo(){
    this.dialog.open(this.ChatInfo, {height:'1000px'});
  }

  readURL(event: any): void {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];

        const reader = new FileReader();
        reader.onload = e => this.imageSrc = reader.result;

        reader.readAsDataURL(file);
    }
}

urls:any;
imgName:any
files:any=[]
  detectFiles(event:any) {
    debugger
    this.urls = [];
    this.files = event.target.files;
    console.log(this.files,'files');
    if (this.files) {
      for (let file of this.files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push({url:e.target.result, name:file.name});        
        }
        reader.readAsDataURL(file);
      }     
    }
    console.log(this.urls,'urls');
  }

  UploadMessageImg(){
    if (this.files) {
      for (let file of this.files) {
        
        
        let fileToUpload = <File>file;
        const formDate = new FormData();
        formDate.append('file',fileToUpload,fileToUpload.name)
        this.chatService.uplodeImageForMessage(formDate);
        console.log(formDate,'formDate');
        this.urls = [];
        this.files=[];
      }     
    }
  }


 deleteImage(name: any, index:any): void {
  debugger
  this.urls = this.urls.filter((a:any) => a.name !== name);
    this.files.splice(index,1);
    console.log(this.files,'Delete Files');
  let test:any
  // for (let file of this.files) {
  //   console.log(file.name,"InFor");
  //   if(file.name != name){
  //     test.push(file)
  //   }
  // } 
  // this.files = test
  console.log(this.urls,'Delete urls');
  console.log(this.files,'Delete Files');
  
  // console.log(index,'Delete index');

}

}
