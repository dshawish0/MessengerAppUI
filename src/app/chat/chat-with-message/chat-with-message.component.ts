import { Component, OnInit , Input, OnChanges, SimpleChanges, TemplateRef, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/Services/chat.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';


interface Message{
  userName:string,
  text:string,
  messageGroupId :string
}

@Component({
  selector: 'app-chat-with-message',
  templateUrl: './chat-with-message.component.html',
  styleUrls: ['./chat-with-message.component.css']
})

export class ChatWithMessageComponent implements OnInit, AfterViewChecked { 

  
  @Input() messageGroup:any;
  @ViewChild('userProfileDialog') userProfileDialog! :TemplateRef<any>;
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;
  changelog: string[] = [];

  userLoged=this.chatService.data.nameid;

  messages: Message[]=[]
  messDataBase: any[]=[]

// connection = new signalR.HubConnectionBuilder()
//       .withUrl("https://localhost:44318/chat")
//       .build();

  currentGroupId:any;
  constructor(public chatService:ChatService, public dialog:MatDialog) { 

    // this.startConnection();
    console.log("i'm Herrrrrrrrrrrrrrrrrrrrrrrrrrrrrre");
    this.currentGroupId=this.chatService.id;
  }


  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }


  messageGroupId:any
  ngOnInit(): void {
    this.scrollToBottom();
    console.log(this.messageGroupId, "chatwithMessage");
     this.messageGroupId=this.messageGroup
    
     this.messageGroupId = this.chatService.id;
     console.log(this.messageGroupId,"ddddddd");
     this.chatService.getGroupMemberByMessageGroupId(this.messageGroupId)

     console.log("ChatWithMessageComponent");


     if(this.currentGroupId != this.chatService.id)
          console.log("ezzzzzzzzzzzzzzzzzzzzz");

      console.log(this.currentGroupId+"Deiaa was here");
      console.log(this.chatService.id+"Deiaa was here Again");

  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

// startConnection(){
//   this.connection.on("newMessage",(userName: string, text: string)=>{
//     this.messages.push({
//       text: text,
//       userName: userName,
//       messageGroupId: environment.messageGroupIdGlobal.toString()
//     });
//     console.log('deiaaTest '+environment.messageGroupIdGlobal);
//   });

//   this.connection.start();
// }



  collapse(){
    this.chatService.collapse = false
  }
  
  ShowChatInformation(){
    this.chatService.ShowChatInfo = false
  }
  

messageText:any;
  messageform: FormGroup = new FormGroup({
    text:new FormControl('',[Validators.required]),
    senderId:new FormControl(''),
    messageDate:new FormControl(''),
    messageGroupId:new FormControl('')
  });

  CreateMessage(){

    this.messageform.controls['messageGroupId'].setValue(this.chatService.updateedId);
    this.messageform.controls['senderId'].setValue(this.userLoged);
    this.messageform.controls['messageDate'].setValue(new Date());
    //this.messageform.controls['messageDate'].setValue();

    // this.chatService.CreateMessage(this.messageform.value)
    // this.messageText='';

    //this.messDataBase.push(this.messageform.value)
    // console.log("messageGroupId "+this.messageform.controls['messageGroupId'].value);
    // console.log("senderId "+this.messageform.controls['senderId'].value);
    // console.log("text "+this.messageform.controls['text'].value);
    // console.log(new Date());

    // this.messDataBase.push({
    //   text:this.messageform.controls['text'].value,
    //   senderId:this.messageform.controls['senderId'].value,
    //   messageGroupId:this.messageform.controls['messageGroupId'].value,
    //   messageDate:this.messageform.controls['messageDate'].value
    // });


    // console.log("values"+this.messDataBase.values());
    // console.log("tostring"+this.messDataBase.toString());
    // console.log("free"+this.messDataBase[0].messageDate);
    // console.log("freetostring"+this.messDataBase[0].messageDate.toString());


    this.chatService.CreateMessage(this.messageform.value)

    this.chatService.connection.send("newMessage", this.userLoged, this.messageform.controls['text'].value)
        .then(()=>{
          this.messageform.controls['text'].setValue('');
        });
      

  }

  DeleteMessage(messageId:any){
    this.chatService.DeleteMessage(messageId);
    
  }

  UserProfile(userId:any){
    console.log("UserProfile", this.chatService.allMemberinMessageGroup);
    
    console.log('UserProfile',userId);
    this.chatService.UserProfile(userId)
    this.dialog.open(this.userProfileDialog,{width:'450px',height:'550px'});
  }
  CloseDialog(){
    this.dialog.closeAll()
  }



  urls:any[]=[];
imgName:any
files:any[]=[];
  detectFiles(event:any) {
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

        this.messageform.controls['messageGroupId'].setValue(this.chatService.updateedId);
    this.messageform.controls['senderId'].setValue(this.userLoged);
    this.messageform.controls['messageDate'].setValue(new Date());
    this.messageform.controls['text'].setValue(this.chatService.imageMessage.text)

        this.chatService.SendImageAsMessage(this.messageform.value);
        
        this.chatService.connection.send("newMessage", this.userLoged, this.messageform.controls['text'].value)
        .then(()=>{
          this.messageform.controls['text'].setValue('');
        });

        console.log(formDate,'formDate');
        this.urls = [];
        this.files=[];
      }     
    }
  }


 deleteImage(name: any, index:any): void {
  debugger
  this.urls = this.urls.filter((a:any) => a.name !== name);
    // this.files.splice(index,1);
    this.files =this.files.filter((item:any)=> item.name!==name)
    console.log(this.files,'Delete Files');
  // let test:any
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
