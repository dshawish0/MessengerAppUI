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
  reports: any = [];
  GetAllReport() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/ReportUser/GetReportUsers').subscribe(
      (result) => {
        this.reports = result;
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
  Accepts(body: any) {
    this.spinner.show();
    debugger
    this.http.put('https://localhost:44318/api/ReportUser/acceptingReportUser', body).subscribe(
      (result) => {
        debugger
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      },
      err => {

        this.spinner.hide();
        this.toastr.error('Error');
      })
    window.location.reload();
  }
  Regects(body: any) {
    this.spinner.show();
    debugger
    this.http.put('https://localhost:44318/api/ReportUser/rejectreport', body).subscribe(
      (result) => {
        debugger
        console.log(result);
        this.spinner.hide();
        this.toastr.success('sucssess');
      },
      err => {
        this.spinner.hide();
        this.toastr.error('Error');
      })
    window.location.reload();
  }
  searchReport(id: number) {
    this.spinner.show();
    this.http.get('https://localhost:44318/api/ReportUser/GetReportUsersById/'+id).subscribe(
      (res) => {
        console.log(res);
        this.reports = res;
        this.spinner.hide();
        this.toastr.success('Search success');
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message);
        //this.toaster.error('something error');
      })

  }
  addservices: any = [];
  GetAll() {
    //show spinner
    this.spinner.show();
    this.http.get('https://localhost:44318/api/Services/GetAllServices').subscribe(
      (res) => {
        this.addservices = res;
        console.log(res);
        console.log('getAll');
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
      },
      err => {
        console.log('error');
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }
  Createservice(body: any) {
    debugger
    this.http.post('https://localhost:44318/api/Services/AddServices', body).subscribe(
      (res) => {
        debugger
        console.log("created");
      }, err => {
        console.log("Error");

      })
    console.log(body);
    window.location.reload();
  }
  deleteservices(id: any) {
    debugger
    this.http.delete('https://localhost:44318/api/Services/DeleteServices/' + id).subscribe(
      (res) => {
        console.log('deleted');

      }, err => {

        console.log("Error");
      })
    window.location.reload();

  }
  Updateservices(body: any) {
    debugger
    this.http.put('https://localhost:44318/api/Services/update', body).subscribe
      ((resp) => {
      },
        err => {
          console.log("Error");
        })
    window.location.reload();
  }
  searchservices(data: number) {
    this.http.get('https://localhost:44318/api/Services/GetServiseById/' + data)
      .subscribe((res) => {
        console.log(res);
        this.addservices = [res];
      },
        err => {
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
        //this.toastr.success('sucssess');
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
    this.http.post('https://localhost:44318/api/Footer/upLoadImg', file).subscribe(
      (res:any)=>{
        console.log("***********************");
        console.log(res);
        this.displayImg=res.logoImg;
        console.log(this.displayImg);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess Upload');

      },err =>{
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }
  display_Img:any;
  UpdateUser(body:any){
    body.proFileImg = this.display_Img;
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
  footerInfo: any = [];
  GetAllFooter() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Footer').subscribe(
      (result) => {
        this.footerInfo = result;
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
  UpdateFooter(body: any) {
    this.spinner.show();
    if(this.displayImg != null){
      body.logoImg = this.displayImg;
    } 
    debugger
    this.http.put('https://localhost:44318/api/Footer/UpdateFooter', body).subscribe(
      (resp) => {
      this.spinner.hide();
      this.toastr.success('sucssess Updated');
    }, err => {
      this.spinner.hide();
      this.toastr.error('Error');
    })
    window.location.reload();
  }
  HomeInfo: any = [];
  GetHome(){
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Home/GetHome').subscribe(
      (result) => {
        this.HomeInfo = result;
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
  
  uploadAttachmentUser(file: FormData) {
    debugger
    this.http.post('https://localhost:44318/api/User/uploadImageAdmin', file).subscribe(
      (res: any) => {
        console.log("**************** Upload user *************");
        console.log(res.proFileImg);
        this.display_Img = res.proFileImg;
        console.log(this.display_Img);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess Upload Image');

      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }
  testimonailShow:any=[];
  GetAlltestimonialShow() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Testimonial/GetTestimonialShow').subscribe(
      (result) => {
        debugger
        this.testimonailShow = result;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess GetAlltestimonialShow');
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
      })
  }





}

