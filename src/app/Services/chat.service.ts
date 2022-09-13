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
  messageType:string,
  imgUserSender:string
  messageDate:Date,
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  updateedId='';
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService, private loginService:LoginService, public dialog:MatDialog) { 
    this.getUser();
    this.MyProfile() 
    //console.log(this.data,"ChatService constructor");
    //console.log(this.myProfile,"ChatService constructor myProfile");
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

  //show image 
  urls:any[]=[];
  files:any;
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
  Alluser: any = []
  GetAllUser(){
    this.http.get('https://localhost:44318/api/User').subscribe((res) => {
      this.Alluser = res
      console.log(this.Alluser);
      
    },err=>{
      this.toastr.error(err.message)
    })
  }
  
  friend: any = {}
  AddFriend(userreceiveId: any) {
      this.friend = {
        Userreceiveid: userreceiveId,
        Status: 0,
        User_Id: this.data.nameid //from login
      };
      console.log(this.friend, "friend");
      
      this.http.post('https://localhost:44318/api/Frind/AddFrind', this.friend).subscribe((result) => {
        this.toastr.success('success')
      },
        err => {
          this.toastr.error(err.message)
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
    console.log(chatAndMember,"chatAndMember");
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
    console.log(messageGroup,"udate chat image");
    
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
  .withAutomaticReconnect()
  .build();
  
  MessageChat(messageGroupId: any) {
    environment.messageGroupIdGlobal=messageGroupId;
    this.updateedId=environment.messageGroupIdGlobal.toString();
    environment.messageGroupIdGlobal=messageGroupId;
    this.id = messageGroupId
    // if(signalR.HubConnectionState.Connected==this.connection.state)
    //       this.connection.stop();
    //  else{
    // //   // this.connection = new signalR.HubConnectionBuilder()
    // //   //                 .withUrl('https://localhost:44318/chat')
    // //   //                 .withAutomaticReconnect()
    // //   //                 .build();

    //   this.startConnection();
    // }
console.log(this.messages,'Deiaa was hereeeeeeeee')
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
    this.messages=[];
    this.connection.on("newMessage",(userName: string, text: string, messageType:string, imgUserSender:string, messageDate:Date)=>{
      this.messages.push({
        text: text,
        userName: userName,
        messageGroupId: environment.messageGroupIdGlobal.toString(),
        messageType: messageType,
        imgUserSender:imgUserSender,
        messageDate:messageDate
      });
      //this.messages.forEach(projet=>console.log(projet.messageGroupId));
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
  this.connection.send("newMessage", this.data.nameid, messageimg.text, messageimg.messageType, this.myProfile.proFileImg, messageimg.messageDate)
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
    // this.myProfile = result;
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
    setTimeout(()=>{
      this.allServices = result;
      this.allServices = this.allServices.filter((ar:any) => !this.payment.find((rm:any) => (rm.service.serviceid === ar.serviceid) ))
  }, 2000);
    

    //  this.allServices = this.allServices.filter((s:any)=>s != this.payment.map((p:any)=>p.service))
    console.log(this.allServices,"allServices");
    
  },error=>{
    this.toastr.error(error.message)
  })
 }

 PayService(service:any){

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
  this.http.post(`https://localhost:44318/api/Login/logOut/${userid}`,'this.user').subscribe(
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

SendTest(Text:any){
  var body ={
    Message:Text.value,
    status:0,
    userId:this.data.nameid

  }
  console.log(Text.value,"Deiaa was hereeee")
  this.http.post('https://localhost:44318/api/Testimonial',body).subscribe((result)=>{
    this.toastr.success('Thank You')
  },(error)=>{

  })
}

}




