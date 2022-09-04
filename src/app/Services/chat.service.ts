import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SideBarComponent } from '../chat/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { MyprofileComponent } from '../chat/myprofile/myprofile.component';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import { ChatWithMessageComponent } from '../chat/chat-with-message/chat-with-message.component';
import * as signalR from '@microsoft/signalr';
import { LoginService } from './login.service';

interface Message{
  userName:string,
  text:string,
  messageGroupId :string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  updateedId='';
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private loginService:LoginService) { 
    this.startConnection();
  }

   
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
      this.lopy = this.users.filter((item: any) => item.status === 0 && item.userReciveId=== this.data.nameid); //1FromLogin
      this.blockFriend = this.users.filter((item: any) => item.status === 2);
      this.numOfFriend = this.myFriend.length;
      console.log(this.blockFriend,"FriendBlock");
      console.log(this.myFriend,"myFriend");
      console.log(this.lopy,"lopy");
      console.log(this.users,"users");
      
    },
      err => {
        console.log('error')
      })
  }

  user: any = []
  friend: any = {}
  ids: any = []
  AddFriend(userName: any) {
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
    this.http.put(`https://localhost:44318/api/Frind/BlockFriend/${frindid}`, "").subscribe((result) => {
      window.location.reload();
    },
      error => {
        console.log('error');
      })
  }

  UnBlockFrind(friendId:any){
    console.log(friendId);
    this.http.put(`https://localhost:44318/api/Frind/BlockFriend/${friendId}`, "").subscribe((result) => {
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
  GetAllChat() {

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

  DeleteChat(GroupMemberId: any) {
    console.log(GroupMemberId,"yazannnnnn");
    this.spinner.show();
    this.http.delete(`https://localhost:44318/api/GroupMember/DeleteGroupMember/${GroupMemberId}`).subscribe((res) => {
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
  id: any=0;
  messages: Message[]=[]
 groupData:any[]=[];
  connection = new signalR.HubConnectionBuilder()
  .withUrl("https://localhost:44318/chat")
  .build();
  
  MessageChat(messageGroupId: any) {
    environment.messageGroupIdGlobal=messageGroupId;
    this.updateedId=environment.messageGroupIdGlobal.toString();
    console.log("srevice", messageGroupId);
    environment.messageGroupIdGlobal=messageGroupId;
    console.log("Deiaa in ChatService "+this.updateedId);
    this.id = messageGroupId
    this.http.get(`https://localhost:44318/api/Message/GetMessageForMessageGroup/${messageGroupId}`).subscribe((res) => {
      this.AllMessage = res;
      console.log("Message", this.AllMessage);
      this.groupData = this.all_chat.filter((group:any)=>group.messageGroupId == this.id)
      console.log(this.groupData,"this.groupData");
      this.getGroupMemberByMessageGroupId(messageGroupId)
      this.messages=[];

    },
      err => {
        console.log('error')
      })
  }


  startConnection(){
    this.connection.on("newMessage",(userName: string, text: string)=>{
      this.messages.push({
        text: text,
        userName: userName,
        messageGroupId: environment.messageGroupIdGlobal.toString()
      });
      this.messages.forEach(projet=>console.log(projet.messageGroupId));
    });
  
    this.connection.start();
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
      console.log("allMemberinMessageGroup", this.allMemberinMessageGroup);

    },
      err => {
        console.log('error')
      })
  }

  userProfile:any;
  UserProfile(userId:any){
    this.userProfile = this.allMemberinMessageGroup.filter((i:any)=>i.user.userId == userId).map((u:any)=>u.user);
    console.log("userProfileService",this.userProfile);

    if(this.userProfile.length==0){
      this.userProfile = this.users.filter((item: any) => item.user.userId === userId).map((u:any)=>u.user);
      console.log("IIIIIFFFFFFFuserProfileService",this.userProfile);
    }
    
  }

  myProfile:any;
  MyProfile(){
    this.spinner.show();
    this.http.get(`https://localhost:44318/api/User/GetUserById/${this.data.nameid}`).subscribe((result)=>{
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
    this.toastr.success("success");
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


 //ReportUser(body:any){
  //this.spinner.show();
  //this.http.post('https://localhost:44318/api/ReportUser/Create',body).subscribe((result)=>{
   // this.spinner.hide();
 //   this.toastr.success('success')
 // }, err=>{
  //  this.spinner.hide();
  //  this.toastr.error(err.message);
 // })
// }
//}




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



 imageMessage:any;
 uplodeImageForMessage(file: FormData){
  this.http.post('https://localhost:44318/api/Message/uploadImageMessage',file).subscribe(
    (resp)=>{
      this.imageMessage=resp;
      console.log(this.imageMessage,"uplodeimageService");
      // this.SendImageAsMessage()
    },err =>{
      this.toastr.error(err.message);
    })
 }

 SendImageAsMessage(messageimg:any){
  // this.imageMessage.messageGroupId = this.id;
  // this.imageMessage.senderId = this.data.nameid //from login
  // console.log(this.imageMessage);
  this.http.post('https://localhost:44318/api/Message/CreateMessage', messageimg).subscribe((res) => {


    },
      err => {
        console.log('error')
        this.toastr.error("Error")
      })
 }

 numberOfPayment:any=0;
 sumOfTotalPayment:any=0;
 payment:any;
 GetAllPaymentsByUserId(){   
  this.spinner.show();                                           //from Login
  this.http.get(`https://localhost:44318/api/Payment/GetPaymentsByUserId/${this.data.nameid}`).subscribe((res) => {
    this.payment = res;
    this.numberOfPayment = this.payment.length;
    
    this.sumOfTotalPayment = this.payment.map((item: any) => item.service.saleprice)
      .reduce((accumulator:any, current:any) => {
      return accumulator + current;
    }, 0);

    console.log(this.payment,"payment");
    console.log(this.sumOfTotalPayment,"sumOfTotalPayment");
    console.log(this.numberOfPayment,"numberOfPayment");

    this.spinner.hide();

  },
    err => {
      console.log('error')
      this.spinner.hide();
      this.toastr.error("Error")
    })
 }

 UserActive(user:any){
  this.spinner.show();
  this.http.put('https://localhost:44318/api/User/ActivationChange',user).subscribe((result)=>{
    this.myProfile = result;
    this.spinner.hide();
    this.toastr.success("success");
  },
  error=>{
    this.spinner.hide();
    this.toastr.error(error.message);
  })
 }


 allServices:any;
 GetAllServices(){
  this.http.get('https://localhost:44318/api/Services/GetAllServices').subscribe((result)=>{
    this.allServices = result;
    console.log(this.allServices,"this.allServices");
    
  },error=>{
    this.toastr.error(error.message)
  })
 }

 PayService(serviceId:any){
  console.log(serviceId,"serviceId");
  
 }


 searchText:any;
 transform(items: any, filter: any, isAnd: boolean): any {
   if (filter && Array.isArray(items)) {
     let filterKeys = Object.keys(filter);
     if (isAnd) {
       return items.filter(item => {
         filterKeys.reduce((memo, keyName) => {
           return (memo && new RegExp(filter[keyName], 'gi').test(item[keyName])) || filter[keyName] === "";
         }, true)
       });
     } else {

       return items.filter(item => {
         return filterKeys.some((keyName) => {


           let parts = keyName.split(".");
           if (parts.length > 1) {
             let dataList = item[parts[0]];
             if (dataList) {
               const all = dataList.filter((obj: any) => {
                 return obj[parts[1]]?.includes( filter[keyName]);
               });


               return new RegExp(filter[keyName], 'gi').test(JSON.stringify(dataList)) || filter[keyName] === "";
             }
             else {
               return filter[keyName] === "";
             }

           }
           else {
             let res =new RegExp(filter[keyName], 'gi').test(item[keyName]) || filter[keyName] === "";
             console.log(res,"res");
             
             return res
           }

         });
       });
     }
   } else {
    console.log(items,"items");
     return items;
     
     
   }
 }
}




