import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';
import {Chart,registerables } from 'chart.js'
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users: any = [];
  numberofuser = 0;
  userActiv: any = [];
  numofusersActive = 0;
  testimonail: any = [];

  constructor(public http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService,private router :Router) { 
    this.getInfoProfile()
  }

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
        //this.toastr.success('sucssess','',{ positionClass:'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  BlockUser(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44318/api/User/IsBlocked', body).subscribe(
      (result) => {
        console.log(result);
        this.spinner.hide();
        this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
        window.location.reload();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    
  }
  UnBlockUser(body: any) {
    this.spinner.show();
    this.http.post('https://localhost:44318/api/User/UnBlocked', body).subscribe(
      (result) => {
        console.log(result);
        this.spinner.hide();
        this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
        window.location.reload();
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    
  }
  SearchUserName(name: any) {
    this.spinner.show();
    debugger
    this.http.get('https://localhost:44318/api/User/GetUserByUserName/' + name).subscribe(
      (res) => {
        console.log(res);
        this.users = [res];
        this.spinner.hide();
        //this.toastr.success('Search success', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();

        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
        //this.toaster.error('something error');
      })
  }
  GetAlltestimonial() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Testimonial/GetTestimonialByUserName').subscribe(
      (result) => {
        debugger
        this.testimonail = result;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
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
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
    // this.router.navigate(['admin'])
    // this.router.navigate(['admin/testimonial']);
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
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
  }
  SearchUserById(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44318/api/Testimonial/GetUserById', body).subscribe(
      (res) => {
        console.log(res);
        this.testimonail = res;
        this.spinner.hide();
        //this.toastr.success('Search success', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
        //this.toaster.error('something error');
      })

  }
  Searchpublishdate(body: any) {
    this.spinner.show();
    debugger
    this.http.post('https://localhost:44318/api/Testimonial/Getpublishdate', body).subscribe(
      (res) => {
        console.log(res);
        this.testimonail = res;
        this.spinner.hide();
        //this.toastr.success('Search success', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
        //this.toaster.error('something error');
      })
  }
  reports: any = [];
  numofreport=0;
  reportsaccept:any=[];
  GetAllReport() {
    //show spinner
    this.spinner.show();
    
    this.http.get('https://localhost:44318/api/ReportUser/GetAllByusername').subscribe(
      (result) => {
        this.reports = result;
        console.log(result);
        
        this.reportsaccept = this.reports.filter((obj: any) => obj.status === 0);
        this.numofreport = this.reportsaccept.length;
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  Accepts(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44318/api/ReportUser/acceptingReportUser', body).subscribe(
      (result) => {
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
        window.location.reload();
      },
      err => {

        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    
  }
  Regects(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44318/api/ReportUser/rejectreport', body).subscribe(
      (result) => {
        console.log(result);
        this.spinner.hide();
        this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
        window.location.reload();
      },
      err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    
  }
  searchReport(name: any) {
    this.spinner.show();
    this.http.get('https://localhost:44318/api/ReportUser/GetReportUsersByName/' + name).subscribe(
      (res) => {
        console.log(res);
        this.reports = res;
        this.spinner.hide();
        //this.toastr.success('Search success', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
        //this.toaster.error('something error');
      })

  }
  addservices: any = [];
  numofServes=0;
  GetAll() {
    //show spinner
    this.spinner.show();
    this.http.get('https://localhost:44318/api/Services/GetAllServices').subscribe(
      (res) => {
        this.addservices = res;
        this.numofServes = this.addservices.length;
        console.log(res);
        console.log('getAll');
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      },
      err => {
        console.log('error');
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  Createservice(body: any) {
    debugger
    this.spinner.show();
    this.http.post('https://localhost:44318/api/Services/AddServices', body).subscribe(
      (res) => {
        debugger
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });

      })
    console.log(body);
    window.location.reload();
  }
  deleteservices(id: any) {
    this.spinner.show();
    this.http.delete('https://localhost:44318/api/Services/DeleteServices/' + id).subscribe(
      (res) => {
        console.log('deleted');
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();

  }
  Updateservices(body: any) {
    this.spinner.show();
    this.http.put('https://localhost:44318/api/Services/UpDateServices', body).subscribe
      ((resp) => {
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
  }
  searchservices(data: number) {
    this.spinner.show();
    this.http.get('https://localhost:44318/api/Services/getByServicesName/' + data)
      .subscribe((res) => {

        this.addservices = [res];
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      },
        err => {
          this.spinner.hide();
          this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
        })
  }
  UserInfo: any = [];
  getInfoProfile() {
    let token: any = localStorage.getItem('token');
    // console.log(token);
    let data: any = jwt_decode(token);
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/User/GetUserById/' + data.nameid).subscribe(
      (result) => {
        // hide spinner
        this.spinner.hide();
        this.UserInfo = result;
        //show toster
        //this.toastr.success('sucssess','',{ positionClass:'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  displayImg: any;
  uploadAttachment(file: FormData) {
    debugger
    this.http.post('https://localhost:44318/api/Footer/upLoadImg', file).subscribe(
      (res: any) => {
        console.log("***********************");
        console.log(res);
        this.displayImg = res.logoImg;
        console.log(this.displayImg);
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess Upload', '', { positionClass: 'toast-bottom-center' });

      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  display_Img: any;
  UpdateUser(body: any) {
    if(this.display_Img != null){
      body.proFileImg = this.display_Img;
    }
    //show spinner
    this.spinner.show();
    //hits Api
    debugger
    this.http.put('https://localhost:44318/api/User/UpdateUser', body).subscribe(
      (result) => {
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess Updated', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    // window.location.reload();
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
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  UpdateFooter(body: any) {
    this.spinner.show();
    if (this.displayImg != null) {
      body.logoImg = this.displayImg;
    }
    debugger
    this.http.put('https://localhost:44318/api/Footer/UpdateFooter', body).subscribe(
      (resp) => {
        this.spinner.hide();
        //this.toastr.success('sucssess Updated', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
  }
  HomeInfo: any = [];
  GetHome() {
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
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
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
       // this.toastr.success('sucssess Upload Image', '', { positionClass: 'toast-bottom-center' });

      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  logout(userid: any) {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.post('https://localhost:44318/api/Login/logOut/' + userid, userid).subscribe(
      (result) => {
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('logout', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  AboutUs: any = [];
  GetAboutUs() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/AboutUs/GetAbout').subscribe(
      (result) => {
        this.AboutUs = result;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  displayImgabout: any;
  uploadAttachmentAbout(file: FormData) {
    debugger
    this.http.post('https://localhost:44318/api/AboutUs/upLoadImg', file).subscribe(
      (res: any) => {
        console.log(res);
        this.displayImgabout = res.imgPaht;
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess Upload', '', { positionClass: 'toast-bottom-center' });

      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  UpdateAbout(body:any){
    this.spinner.show();
    if (this.displayImgabout != null) {
      body.imgPaht = this.displayImgabout;
    }
    debugger
    this.http.put('https://localhost:44318/api/AboutUs/UpdateAbout', body).subscribe(
      (resp) => {
        this.spinner.hide();
        //this.toastr.success('sucssess Updated', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
  }
  ContactUs: any = [];
  GetContactUs() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/ContactUs/GetContact').subscribe(
      (result) => {
        console.log(result);
        
        this.ContactUs = result;
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  UpdateContact(body:any){
    this.spinner.show();
    debugger
    this.http.put('https://localhost:44318/api/ContactUs/UpdateContact', body).subscribe(
      (resp) => {
        this.spinner.hide();
        //this.toastr.success('sucssess Updated', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
  }
  Payment: any = [];
  GetPayment() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Payment/GetPaymentsByDetails').subscribe(
      (result) => {
        console.log(result);
        this.Payment = result;
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  chart:any={}
  numofuserblock=0;
  userblock: any = [];
  GetChart(){
  this.http.get('https://localhost:44318/api/User').subscribe(
      (result) => {
        this.users = result;
        this.numberofuser = this.users.length;
        this.userActiv = this.users.filter((obj: any) => obj.isActive === 1);
        this.numofusersActive = this.userActiv.length;
        this.userblock = this.users.filter((obj: any) => obj.isBlocked == 1);
        this.numofuserblock =this.userblock.length;
        this.chart = new Chart('myChart', {
          type: 'pie',
          data: {
            labels: ['Number of User', 'Number of Activ',"Number of Block"],
            datasets: [{
              label: 'Users',
              data: [this.numberofuser,this.numofusersActive,this.numofuserblock],
              borderWidth: 1, 
              //fill:false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(93,175,89,01)',
                'rgb(54, 162, 235)',
              ],
              borderColor: '#3e95cd',
            },],
          },
        })
        // this.chart = new Chart('myChart2', {
        //   type: 'bar',
        //   data: {
        //     labels: ['Number of User', 'Number of Activ',"Number of Block"],
        //     datasets: [{
        //       label: 'Users',
        //       data: [this.numberofuser,this.numofusersActive,this.numofuserblock],
        //       borderWidth: 1, 
        //       //fill:false,
        //       backgroundColor: [
        //         'rgba(255, 99, 132, 0.2)',
        //         'rgba(93,175,89,01)',
        //         'rgb(54, 162, 235)',
        //       ],
        //       borderColor: '#3e95cd',
        //     },],
        //   },
        // })
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess','',{ positionClass:'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
    })
  }
  numofrevenue=0;
  GetRevenue(){
    debugger
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Payment/GetRevenue').subscribe(
      (res:any) => {
        console.log(res);
        this.numofrevenue = res[0].revenue;
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  key:any={}
  GetChart2(){
    debugger
    this.http.get('https://localhost:44318/api/Payment/GetRevenueByMonth').subscribe(
        (result:any) => {
          console.log(result);
          let key: string[] = [];
          let value1: string[] = [];
          result.forEach(function (value:any) {
            console.log(value);
            console.log(value.monthName);
            key.push(value.monthName)
            console.log(value.revenue);
            value1.push(value.revenue)
          }); 
          
          this.chart = new Chart('myChart2', {
            type: 'bar',
            data: {
              labels:key,
              datasets: [
                {  
                  label: "Revenue",
                  data:value1,
                  borderWidth: 1, 
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 205, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: '#3e95cd',
              },
              ],
            },
          })
          // hide spinner
          this.spinner.hide();
          //show toster
          //this.toastr.success('sucssess','',{ positionClass:'toast-bottom-center' });
        }, err => {
          //hide spinner
          this.spinner.hide();
          //show toster
          this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    }
  DeleteContact(id:any){
      this.spinner.show();
    debugger    
    console.log(id);
    
    this.http.delete('https://localhost:44318/api/ContactUs/DeleteContact/'+id).subscribe(
      (resp) => {
        this.spinner.hide();
        //this.toastr.success('sucssess Updated', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
    }
  
 searchText:any;
 searchText2:any;
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
}

