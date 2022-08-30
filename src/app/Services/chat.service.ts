import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SideBarComponent } from '../chat/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { MyprofileComponent } from '../chat/myprofile/myprofile.component';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

   
data:any;

  getUser(){
    const token = localStorage.getItem('token');
    if(token){
        this.data = jwt_decode(token);
    }
  }

  collapse:boolean = false;
  ShowChatInfo:boolean= true;

  users: any = []
  myFriend: any = [];
  lopy: any = [];
  blockFriend: any = [];

  numOfFriend: number = 0;
  GetAllFrinds() {
    this.http.get('https://localhost:44318/api/Frind/GetFrinds/'+this.data.nameid).subscribe((res) => {
      this.users = res;

      this.myFriend = this.users.filter((item: any) => item.status === 1);
      this.lopy = this.users.filter((item: any) => item.status === 0);
      this.blockFriend = this.users.filter((item: any) => item.status === 2);
      this.numOfFriend = this.myFriend.length;

    },
      err => {
        console.log('error')
      })
  }

  user: any = []
  friend: any = {}
  ids: any = []
  AddFriend(userName: any) {
    debugger
    this.http.get('https://localhost:44318/api/User/GetUserByUserName/'+userName.userName).subscribe((res) => {
      this.user = [res]
      this.ids = this.user.map((obj: any) => obj.userId);
      console.log(this.ids[0]);

      this.friend = {
        Userreceiveid: this.ids[0],
        Status: 0,
        User_Id: this.data.nameid //from login
      };

      this.http.post('https://localhost:44318/api/Frind/AddFrind', this.friend).subscribe((result) => {
        //console.log("ok", result);
        //console.log("yazan");
      },
        err => {
          console.log("error")
        })

    },
      err => {
        console.log(err.message);
      })
  }

  AcceptFriend(frindid:number) {
    this.http.put(`https://localhost:44318/api/Frind/confirmFriend/${frindid}`, "").subscribe((result) => {
      
      window.location.reload();
    },
      error => {
        console.log('error');
      })
  }

  Blockuser(frindid: any) {
    this.http.put(`https://localhost:44318/api/Frind/BlockFriend/${41}`, "").subscribe((result) => {
      window.location.reload();
    },
      error => {
        console.log('error');
      })
  }

  RejectFriend(frindid: any) {
    this.http.delete(`https://localhost:44318/api/Frind/DeleteFrind/${frindid}`).subscribe((result) => {
      console.log("Ok Tayem");
      window.location.reload();
    },
      error => {
        console.log('error');
      })
  }

  all_chat: any = [];
  last_Message: any = []
  GetAllChat(id: any) {

    this.http.get("https://localhost:44318/api/MessageGroup/GetFullMessageGroup/"+this.data.nameid).subscribe((res) => {
      this.all_chat = res;
      console.log(this.all_chat);
      if (this.all_chat.messages != null)
        this.last_Message = this.all_chat.map((obj: any) => obj.messages);


      console.log(this.all_chat, "allchat");
      // console.log(this.last_Message[this.last_Message.length-1].text);
      // window.location.reload();
    },
      error => {
        console.log('error');

      })
  }

  display_Img: any;
  uploadImage(file: FormData) {
    this.http.post('https://localhost:44318/api/MessageGroup/uploadImage', file).subscribe((res) => {
      this.display_Img = res;
      console.log(this.display_Img);

    },
      error => {
        console.log("upload", error);
      })
  }


  createChat(chatAndMember: any) {
    if (this.display_Img != undefined) {
      chatAndMember.messageGroup.GroupImg = this.display_Img.groupImg;
    }


    console.log(chatAndMember, "sss");

    this.spinner.show();
    this.http.post('https://localhost:44318/api/Dto/CreateGroupAndMember', chatAndMember).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success("Create Chat success");
      window.location.reload();
    },
      error => {
        this.spinner.hide();
        this.toastr.error("Error")
      })
  }


  UpdateChat(messageGroup: any) {

    if (this.display_Img != undefined) {
      messageGroup.groupImg = this.display_Img.groupImg;
    }
    this.spinner.show();
    this.http.put('https://localhost:44318/api/MessageGroup/UpDateMessageGroup', messageGroup).subscribe((res) => {
      console.log(res);

      this.spinner.hide();
      this.toastr.success("Update success");
      window.location.reload();
    },
      error => {
        this.spinner.hide();
        console.log(error.message);
        this.toastr.error("Error");
      })
  }

  DeleteChat(messageGroupId: any) {
    this.spinner.show();
    this.http.delete(`https://localhost:44318/api/MessageGroup/DeleteMessageGroup/${messageGroupId}`).subscribe((res) => {
      console.log(res);

      this.spinner.hide();
      this.toastr.success("Update success");
      window.location.reload();
    },
      error => {
        this.spinner.hide();
        console.log(error.message);
        this.toastr.error("Error");
      })
  }

  AllMessage: any = []
  id: any
  MessageChat(messageGroupId: any) {
    console.log("srevice", messageGroupId);
    this.id = messageGroupId
    this.http.get(`https://localhost:44318/api/Message/GetMessageForMessageGroup/${messageGroupId}`).subscribe((res) => {
      this.AllMessage = res;
      console.log("Message", this.AllMessage);

    },
      err => {
        console.log('error')
      })
  }

  CreateMessage(message: any) {
    console.log("service", message);
    this.http.post('https://localhost:44318/api/Message/CreateMessage', message).subscribe((res) => {


    },
      err => {
        console.log('error')
        this.toastr.error("Error")
      })
  }
  allMemberinMessageGroup: any = []
  getGroupMemberByMessageGroupId(MessageGroupId: any) {
    console.log(MessageGroupId, "getGroupMember");
    this.http.get(`https://localhost:44318/api/GroupMember/GetGroupMemberForMessageGroup/${MessageGroupId}`).subscribe((res) => {
      this.allMemberinMessageGroup = res;
      console.log("Message", this.allMemberinMessageGroup);

    },
      err => {
        console.log('error')
      })
  }

  userProfile:any= this.allMemberinMessageGroup.filter((i:any)=>i.groupMemberId == this.allMemberinMessageGroup[0].groupMemberId);
  UserProfile(memberId:any){
    this.userProfile = this.allMemberinMessageGroup.filter((i:any)=>i.groupMemberId == memberId);
    console.log("userProfileService",this.userProfile);
    
  }

  myProfile:any;
  MyProfile(userId: any){
    console.log(userId, 'MyProfileService');
    this.spinner.show();
    this.http.get(`https://localhost:44318/api/User/GetUserById/${userId}`).subscribe((result)=>{
      this.myProfile = result;
      this.spinner.hide();
      console.log(this.myProfile);
      
    },
    error=>{
      this.spinner.hide();
      this.toastr.error(error.message);
    })
    
 }

 imageProfile:any;
 uplodeImageForProfileUser(file: FormData){
  this.http.post('https://localhost:44318/api/user/uploadImage',file).subscribe(
    (resp)=>{
      this.imageProfile=resp;
      console.log(this.imageProfile,"uplodeimageService");
      
    },err =>{
      this.toastr.error(err.message);
    })
 }

 UpDataProfileUser(profile:any){
  if(this.imageProfile!= undefined){
    profile.proFileImg = this.imageProfile.proFileImg;
  }
  console.log(profile,'profileService');
  
  this.spinner.show();
  this.http.put('https://localhost:44318/api/User/UpdateUser',profile).subscribe((result)=>{
    this.myProfile = result;
    this.spinner.hide();
    
  },
  error=>{
    this.spinner.hide();
    this.toastr.error(error.message);
  })
 }

 search:any;
 SearchMessageBetweenDate(body:any){
  this.spinner.show();
  this.http.post('https://localhost:44318/api/Message/SearchMessageBetweenDate',body).subscribe((result)=>{
    this.AllMessage = result;
    console.log(this.AllMessage,"Search");
    this.spinner.hide();
    this.toastr.success('success')
  }, err=>{
    this.spinner.hide();
    this.toastr.error(err.message);
  })
 }
<<<<<<< Updated upstream
=======

 ReportUser(body:any){
  this.spinner.show();
  this.http.post('https://localhost:44318/api/ReportUser/Create',body).subscribe((result)=>{
    this.spinner.hide();
    this.toastr.success('success')
  }, err=>{
    this.spinner.hide();
    this.toastr.error(err.message);
  })
 }

 //***********************************SignlR**********************

 
>>>>>>> Stashed changes
}



