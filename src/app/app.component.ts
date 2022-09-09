import { AfterViewInit, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ChatService } from './Services/chat.service';
import { HomeService } from './Services/home.service';
import jwt_decode from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { AdminService } from './Services/admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  @ViewChild('btn') btn!: ElementRef;
  title = 'MessengerApp';
  data:any;
  constructor( public home:HomeService,  private http: HttpClient){
    this.home.GetAlltestimonialShow();
    // if(localStorage.getItem('token')!=undefined || localStorage.getItem('token')!=null || localStorage.getItem('token')!=''){
    //   this.chatService.getUser();
    //   this.chatService.MyProfile() 
    // }

    
    // const token = localStorage.getItem('token');
    // if(token){
    //     this.data = jwt_decode(token);
    //     if(this.data.role=='user'){
    //       this.chatService.data = this.data;
    //       this.chatService.MyProfile() 
    //       console.log("token User");
          
    //     }else if(this.data.role=='admin'){
    //       this.adminService.getInfoProfile()
    //       console.log("token admin");
    //     }
        
    // }
  }
  // getUser(){
  //   const token = localStorage.getItem('token');
  //   if(token){
  //       this.data = jwt_decode(token);
  //       this.chatService.data = this.data;
  //   }
  // }
  // MyProfile(){
  //   this.http.get(`https://localhost:44318/api/User/GetUserById/${this.data.nameid}`).subscribe((result)=>{
  //     this.chatService.myProfile = result;
      
  //   })
  // }

  
}
