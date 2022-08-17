import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SideBarComponent } from '../chat/side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http:HttpClient) { }

  users:any=[]
  myFriend:any=[];
  lopy:any=[];
  blockFriend:any=[];

  numOfFriend:number=0;
  GetAllFrinds(){
    this.http.get('https://localhost:44318/api/Frind/GetFrinds/4').subscribe((res)=>{
      this.users= res;
      
      this.myFriend = this.users.filter((item:any)=>item.status===1);
      this.lopy = this.users.filter((item:any)=>item.status===0); 
      this.blockFriend = this.users.filter((item:any)=>item.status===2); 
      this.numOfFriend = this.myFriend.length;

    },
    err=>{
      console.log('error')
    })
  }

  user:any=[]
  friend:any={}
  ids:any=[]
  AddFriend(email:any){
    this.http.post('https://localhost:44318/api/User/GetUserByEmail',email).subscribe((res)=>{
      this.user=[res]
      this.ids = this.user.map((obj:any) => obj.userId);
      console.log(this.ids[0]);

      this.friend={
        Userreceiveid:this.ids[0],
        Status : 0,
        User_Id:4
      };

      this.http.post('https://localhost:44318/api/Frind/AddFrind',this.friend).subscribe((result)=>{
        console.log("ok",result);
        console.log("yazan");
      },
      err=>{console.log("error")
    })

    },
    err=>{
      console.log(err.message);
    })
  }

  AcceptFriend(frindid:any){
    this.http.put(`https://localhost:44318/api/Frind/confirmFriend/${41}`,"").subscribe((result)=>{
      console.log("Ok Tayem");
      window.location.reload();
    },
    error=>{
      console.log('error');
    })
  }

  Blockuser(frindid:any){
    this.http.put(`https://localhost:44318/api/Frind/BlockFriend/${41}`,"").subscribe((result)=>{
      console.log("Ok Tayem");
      window.location.reload();
    },
    error=>{
      console.log('error');
    })
  }

  RejectFriend(frindid:any){
    this.http.delete(`https://localhost:44318/api/Frind/DeleteFrind/${frindid}`).subscribe((result)=>{
      console.log("Ok Tayem");
      window.location.reload();
    },
    error=>{
      console.log('error');
    })
  }
}

