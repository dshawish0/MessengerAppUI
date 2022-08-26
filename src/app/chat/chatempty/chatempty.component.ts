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


  constructor(public chatService:ChatService, public fb: FormBuilder, public dialog:MatDialog) { 
     // Reactive Form
     this.uploadForm = this.fb.group({
      avatar: [null],
      name: ['']
    })
  }

  ngOnInit(): void {
    console.log("chatempty",this.chatService.AllMessage);
    
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

  imageURL: string | undefined;
  uploadForm: FormGroup= new FormGroup({});


  showPreview(event:any) {
    const file:any = event.target.files[0] as HTMLInputElement;
    this.uploadForm?.patchValue({
      avatar: file
    });
    // this.uploadForm.get('avatar').updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  // Submit Form
  submit() {
    console.log(this.uploadForm.value)
  }

  chatInfo(){
    this.dialog.open(this.ChatInfo, {height:'1000px'});
  }

}
