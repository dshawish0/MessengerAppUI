import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ChatService } from 'src/app/Services/chat.service';

@Component({
  selector: 'app-create-chat',
  templateUrl: './create-chat.component.html',
  styleUrls: ['./create-chat.component.css']
})
export class CreateChatComponent implements OnInit {

  constructor(public chatService:ChatService) { }
  myFriend:any[]=[]
  searchFriend:any
  ngOnInit(): void {
    this.chatService.GetAllFrinds();
    
  }
  GetFriend(){
    this.myFriend = this.chatService.myFriend.map((s:any)=>s.user)
    console.log(this.myFriend, "CreateChatComponent");
  }
  
  createChatForm:FormGroup = new FormGroup({
    GroupName : new FormControl('',Validators.required),
    GroupImg :new FormControl('')
  });
  
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

  groupMembers:any = []//{User_Id:this.chatService.data.nameid}
  disable:boolean = true;

  select(e:any,userid:any){
    if (e.target.checked === true) {
      let checkedObj = {
        User_Id: userid,
      };
      this.groupMembers.push(checkedObj);
    }
    if (e.target.checked === false) {
      var index: number = this.groupMembers
                    .findIndex((x:any) => x.User_Id === userid);
      console.log(index);
      if (index > -1) {
        this.groupMembers.splice(index, 1);
      }
    }
    if(this.groupMembers.length >=3){
      this.disable = false
    }
    else{
      this.disable = true;
    }
    console.log(this.groupMembers);
    
  }

  chatAndMember:any;
  CreateChat(){
    this.chatAndMember={messageGroup:this.createChatForm.value, groupMembers:this.groupMembers} 
    this.chatService.createChat(this.chatAndMember)
  }

}
