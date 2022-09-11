import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SideBarComponent } from '../chat/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { environment } from 'src/environments/environment';
import * as signalR from '@microsoft/signalr';
import { LoginService } from './login.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentDialogComponent } from '../chat/payment-dialog/payment-dialog.component';

interface Message{
  userName:string,
  text:string,
  messageGroupId:string,
  messageType:string
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  updateedId='';
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private loginService:LoginService, public dialog:MatDialog) { 
    this.getUser();
    this.MyProfile() 
    console.log(this.data,"ChatService constructor");
    console.log(this.myProfile,"ChatService constructor myProfile");
    this.startConnection();
  }

   
data:any;

  getUser(){
    this.spinner.show();
    const token = localStorage.getItem('token');
    if(token){
        this.data = jwt_decode(token);
    }
    console.log(this.data,"data");
    this.spinner.hide()
  }

  collapse:boolean = false;
  ShowChatInfo:boolean= true;

  users: any = []
  myFriend: any = [];
  lopy: any = [];
  blockFriend: any = [];

  numOfFriend: number = 0;
  GetAllFrinds() {
    
    this.spinner.show()
    this.http.get('https://localhost:44318/api/Frind/GetFrinds/'+this.data.nameid).subscribe((res) => {
      this.users = res;
      this.myFriend = this.users.filter((item: any) => item.status === 1);
      this.lopy = this.users.filter((item: any) => item.userreceiveid == this.data.nameid && item.status === 0 ); //1FromLogin
      this.blockFriend = this.users.filter((item: any) => item.status === 2);
      this.numOfFriend = this.myFriend.length;
      console.log(this.lopy,"lopy");
      
      this.spinner.hide()
    },
      err => {
        this.spinner.hide()
      })
  }

  user: any = []
  friend: any = {}
  ids: any = []
  AddFriend(userName: any) {
    this.http.get('https://localhost:44318/api/User/GetUserByUserName/'+userName.userName).subscribe((res) => {
      this.user = [res]
      this.ids = this.user.map((obj: any) => obj.userId);

      this.friend = {
        Userreceiveid: this.ids[0],
        Status: 0,
        User_Id: this.data.nameid //from login
      };

      this.http.post('https://localhost:44318/api/Frind/AddFrind', this.friend).subscribe((result) => {
        this.toastr.success('success')
      },
        err => {
        })

    },
      err => {
      })
  }

  AcceptFriend(frindid:number) {
    this.http.put(`https://localhost:44318/api/Frind/confirmFriend/${frindid}`, "").subscribe((result) => {
      
    },
      error => {
        this.toastr.error(error.message)
      })
  }

  Blockuser(frindid: any) {
    this.http.put(`https://localhost:44318/api/Frind/BlockFriend/${frindid}`, "").subscribe((result) => {
      window.location.reload();
    },
      error => {
      })
  }

  UnBlockFrind(friendId:any){
    this.http.put(`https://localhost:44318/api/Frind/BlockFriend/${friendId}`, "").subscribe((result) => {
      window.location.reload();
    },
      error => {
      })
  }

  RejectFriend(frindid: any) {
    this.http.delete(`https://localhost:44318/api/Frind/DeleteFrind/${frindid}`).subscribe((result) => {
      window.location.reload();
    },
      error => {
      })
  }

  all_chat: any = [];
  last_Message: any = []
  GetAllChat() {

    this.http.get(`https://localhost:44318/api/MessageGroup/GetFullMessageGroup/${this.data.nameid}`).subscribe((res) => {
      this.all_chat = res;
      if (this.all_chat.messages != null)
        this.last_Message = this.all_chat.map((obj: any) => obj.messages);
    },
      error => {
        this.toastr.error(error.message);
      })
  }

  display_Img: any;
  uploadImage(file: FormData) {
    this.http.post('https://localhost:44318/api/MessageGroup/uploadImage', file).subscribe((res) => {
      this.display_Img = res;

    },
      error => {
        this.toastr.error(error.message);
      })
  }


  createChat(chatAndMember: any) {
    if (this.display_Img != undefined) {
      chatAndMember.messageGroup.GroupImg = this.display_Img.groupImg;
    }


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

  CreateGroupMember(groupMember:any){
    this.spinner.show();
    this.http.post('https://localhost:44318/api/GroupMember/InsertListOfGroupMember', groupMember).subscribe((res) => {
      this.spinner.hide();
      this.toastr.success("Create Group Member Successfuly");
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
     

      this.spinner.hide();
      this.toastr.success("Update success");
      window.location.reload();
    },
      error => {
        this.spinner.hide();
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
    environment.messageGroupIdGlobal=messageGroupId;
    this.id = messageGroupId
    this.http.get(`https://localhost:44318/api/Message/GetMessageForMessageGroup/${messageGroupId}`).subscribe((res) => {
      this.AllMessage = res;
      this.groupData = this.all_chat.filter((group:any)=>group.messageGroupId == this.id)

      this.getGroupMemberByMessageGroupId(messageGroupId)
      this.messages=[];

    },
      err => {
        this.toastr.error(err.message)
      })
  }

  
  startConnection(){
    this.connection.on("newMessage",(userName: string, text: string, messageType:string)=>{
      this.messages.push({
        text: text,
        userName: userName,
        messageGroupId: environment.messageGroupIdGlobal.toString(),
        messageType: messageType
      }); 
      this.messages.forEach(projet=>console.log(projet.messageGroupId));
    });
  
    this.connection.start();
  }


  CreateMessage(message: any) {
    this.http.post('https://localhost:44318/api/Message/CreateMessage', message).subscribe((res) => {


    },
      err => {
        this.toastr.error("Error")
      })
  }

  allMemberinMessageGroup: any = []
  myGroupMemberId:any;
  getGroupMemberByMessageGroupId(MessageGroupId: any) {
    this.http.get(`https://localhost:44318/api/GroupMember/GetGroupMemberForMessageGroup/${MessageGroupId}`).subscribe((res) => {
      this.allMemberinMessageGroup = res;
      this.myGroupMemberId =this.allMemberinMessageGroup.filter((item:any)=>item.user.userId==this.data.nameid)
    },
      err => {
      })
  }

  DeleteChat() {
    this.spinner.show();
    this.http.delete(`https://localhost:44318/api/GroupMember/DeleteGroupMember/${this.myGroupMemberId[0].groupMemberId}`).subscribe((res) => {

      this.spinner.hide();
      this.toastr.success("Update success");
      window.location.reload();
    },
      error => {
        this.spinner.hide();
        this.toastr.error("Error");
      })
  }

  userProfile:any;
  UserProfile(userId:any){
    this.userProfile = this.allMemberinMessageGroup.filter((i:any)=>i.user.userId == userId).map((u:any)=>u.user);

    if(this.userProfile.length==0){
      this.userProfile = this.users.filter((item: any) => item.user.userId === userId).map((u:any)=>u.user);
    }
    
  }

  myProfile:any;
  old_Data:any;
  MyProfile(){
    this.spinner.show();
    this.http.get(`https://localhost:44318/api/User/GetUserById/${this.data.nameid}`).subscribe((result)=>{
      this.myProfile = result;
      this.old_Data = result;
      this.spinner.hide();
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
      
    },err =>{
      this.toastr.error(err.message);
    })
 }

 UpDataProfileUser(profile:any){
  if(this.imageProfile!= undefined){
    profile.proFileImg = this.imageProfile.proFileImg;
  }
  
  this.spinner.show();
  this.http.put('https://localhost:44318/api/User/UpdateUser',profile).subscribe((result)=>{
    this.myProfile = result;
    window.location.reload();
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
 
 uplodeImageForMessage(file: FormData, message:any={}){
  this.http.post('https://localhost:44318/api/Message/uploadImageMessage',file).subscribe(
    (resp)=>{
      this.imageMessage=resp;
      message.text = this.imageMessage.text;
      console.log(message, "yazan tayem");
      this.SendImageAsMessage(message)
    },err =>{
      this.toastr.error(err.message);
    })
 }

 SendImageAsMessage(messageimg:any={}){
  messageimg.text = this.imageMessage.text
  this.connection.send("newMessage", this.data.nameid, messageimg.text, messageimg.messageType)
  .then(()=>{
    // this.messageform.controls['text'].setValue(''); 
  });
  this.http.post('https://localhost:44318/api/Message/CreateMessage', messageimg).subscribe((res) => {


    },
      err => {
        this.toastr.error("Error")
      })
  
  console.log(messageimg,"messageimg from service");
  
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


    this.spinner.hide();
    console.log(this.payment);
    
  },
    err => {
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
    
  },error=>{
    this.toastr.error(error.message)
  })
 }

 PayService(service:any){

  debugger
  var body ={
    UserId: this.data.nameid,
    ServiceId: environment.serviceId
  };

  this.http.post('https://localhost:44318/api/Payment/AddPayment', body).subscribe((res) => {
    this.toastr.success('Paid successfully', '', { positionClass: 'toast-bottom-center' });
    this.dialog.closeAll
    },
      err => {
        this.toastr.error('Somthing Wrong try again', '', { positionClass: 'toast-bottom-center' });
      })

  //console.log(service,"serviceId");
  //console.log(service,"Deiaa was hereeeeeeeeeeeee");

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
             return res
           }

         });
       });
     }
   } else {
     return items;          
   }
 }

 logout(userid: any) {
  this.spinner.show();
  this.http.post(`https://localhost:44318/api/Login/logOut/${userid}`,this.user).subscribe(
    (result) => {
      this.spinner.hide();
    }, err => {
      this.spinner.hide();
      this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
    })
}

DeleteMessage(messageId:any){
  this.http.delete(`https://localhost:44318/api/Message/DeleteMessage/${messageId}`).subscribe((result)=>{
    this.toastr.success('Deleted Message')
  },(error)=>{
    this.toastr.error('connt delete this message')
  })
}
}




