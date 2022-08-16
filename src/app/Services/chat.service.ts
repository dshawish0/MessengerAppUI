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
  lopy:any=[]
  
  numOfFriend:number=0;
  GetAllFrinds(){
    this.http.get('https://localhost:44318/api/Frind/GetFrinds/4').subscribe((res)=>{
      this.users= res;
      this.numOfFriend = this.users.length;
      console.log(this.users.length)

      console.log(this.myFriend = this.users.filter((obj:any) => {
        return obj.User_Id === 2;
      }))


      this.lopy = this.users.find((x:any) => x.Status == 0)
      console.log("myFriend", this.myFriend);
      console.log("lopy", this.lopy);
      console.log(this.users.find((x:any) => x.Status == 1));
      
      
      
    },
    Error=>{
      console.log('error')
    })
  }

  user:any=[]
  friend:any={}
  AddFriend(email:any){
    this.http.post('https://localhost:44318/api/User/GetUserByEmail',email).subscribe((res)=>{
      this.user=[res]
      const ids = this.user.map((obj:any) => obj.userId);
      
      this.friend={
        Userreceiveid:ids[0],
        Status : 0,
        Adddate: new Date().toLocaleString(),
        User_Id:4
      };
      this.http.post('https://localhost:44318/api/Frind/AddFrind',this.friend).subscribe((result)=>{
        console.log("ok",result)
      },
      err=>{console.log(err.message)})

      
    },
    Error=>{
      console.log('error');
      console.log('err',email);
    })
  }
  
}

