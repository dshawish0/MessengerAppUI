import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users: any = [];
  numberofuser = 0;
  userActiv: any = [];
  numofusersActive = 0;
  testimonail: any = [];

  constructor(public http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  GetAllUser() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/User').subscribe(
      (result) => {
        this.users = result;
        this.numberofuser = this.users.length;
        this.userActiv = this.users.filter((obj: any) => obj.isActive === 1);
        this.numofusersActive = this.userActiv.length;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }
  BlockUser(body: any) {
    //show spinner
    this.spinner.show();
    //hits Api
    debugger
    this.http.post('https://localhost:44318/api/User/IsBlocked', body).subscribe(
      (result) => {
        debugger
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
    window.location.reload();
  }
  UnBlockUser(body: any) {
    //show spinner
    this.spinner.show();
    //hits Api
    debugger
    this.http.post('https://localhost:44318/api/User/UnBlocked', body).subscribe(
      (result) => {
        debugger
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
    window.location.reload();
  }
  SearchUserName(name: any) {
    this.spinner.show();
    debugger
    this.http.get('https://localhost:44318/api/User/GetUserByUserName/' + name).subscribe(
      (res) => {
        console.log(res);
        this.users = [res];
        this.spinner.hide();
        this.toastr.success('Search success');
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message);
        //this.toaster.error('something error');
      })

  }
  GetAlltestimonial() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Testimonial/GetAllTests').subscribe(
      (result) => {
        debugger
        this.testimonail = result;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }
  AcceptTest(body: any) {
    //show spinner
    this.spinner.show();
    //hits Api
    debugger
    this.http.put('https://localhost:44318/api/Testimonial/AcceptTest', body).subscribe(
      (result) => {
        debugger
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
    window.location.reload();
  }
  RejectTest(body: any) {
    //show spinner
    this.spinner.show();
    //hits Api
    debugger
    this.http.put('https://localhost:44318/api/Testimonial/RejectTest', body).subscribe(
      (result) => {
        debugger
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
    window.location.reload();
  }
  SearchUserById(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44318/api/Testimonial/GetUserById',body).subscribe(
      (res) => {
        console.log(res);
        this.testimonail = res;
        this.spinner.hide();
        this.toastr.success('Search success');
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message);
        //this.toaster.error('something error');
      })

  }
  Searchpublishdate(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44318/api/Testimonial/Getpublishdate',body).subscribe(
      (res) => {
        console.log(res);
        this.testimonail = res;
        this.spinner.hide();
        this.toastr.success('Search success');
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message);
        //this.toaster.error('something error');
      })
  }

































































































































  
  
  UserInfo:any=[];
  getInfoProfile(){
    let token:any = localStorage.getItem('token');
    // console.log(token);
    let data :any = jwt_decode(token);
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/User/GetUserById/'+ data.nameid).subscribe(
      (result) => {
        // hide spinner
        this.spinner.hide();
        this.UserInfo = result;
        //show toster
        this.toastr.success('sucssess');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }
  displayImg:any;
  uploadAttachment(file:FormData){
    debugger
    this.http.post('https://localhost:44318/api/user/upLoadImg',file).subscribe(
      (res:any)=>{
        console.log("***********************");
        console.log(res);
        this.displayImg=res.proFileImg;
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess Updated');

    },err =>{
      //hide spinner
      this.spinner.hide();
      //show toster
      this.toastr.error('Error');
    })
  }
  UpdateUser(body:any){
  //show spinner
  this.spinner.show();
  //hits Api
  debugger
  this.http.put('https://localhost:44318/api/User/UpdateUser',body).subscribe(
    (result) => {
      // hide spinner
      this.spinner.hide();
      //show toster
      this.toastr.success('sucssess Updated');
    }, err => {
      //hide spinner
      this.spinner.hide();
      //show toster
      this.toastr.error('Error');
  })
  window.location.reload();
  }
}

