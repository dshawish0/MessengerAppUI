import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }


  testimonailShow:any=[];
  testimonailShowSelected:any=[];
  rand = new Set<number>();
  GetAlltestimonialShow() {
    //show spinner
    this.spinner.show();
    //hits Api
    this.http.get('https://localhost:44318/api/Testimonial/GetTestimonialShow').subscribe(
      (result) => {
        this.testimonailShow = result;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess GetAlltestimonialShow','',{ positionClass:'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error', '', { positionClass: 'toast-bottom-center' });
      })
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
  displayImg: any;
  uploadAttachment(file: FormData, id: number) {
    
    this.http.post('https://localhost:44318/api/Home/upLoadImg/' + id, file).subscribe(
      (res: any) => {
        console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
        console.log(res);
        switch (id) {
          case 1:
            this.displayImg = res.lapImg;
            break;
          case 2:
            this.displayImg = res.chatAppImg;
            break;
          case 3:
            this.displayImg = res.mobileImg;
            break;
          case 4:
            this.displayImg = res.qRcodeImg;
            break;
          case 5:
            this.displayImg = res.userCustamizerImg;
            break;
          case 6:
            this.displayImg = res.rtlImg;
            break;
          case 7:
            this.displayImg = res.filesImg;
            break;
          case 8:
            this.displayImg = res.futcherImg;
            break;
          case 9:
            this.displayImg = res.noteImg;
            break;
          case 10:
            this.displayImg = res.remiderImg;
            break;
          case 11:
            this.displayImg = res.someFutchersImg;
            break;
          case 12:
            this.displayImg = res.darkLightImg;
            break;
          case 13:
            this.displayImg = res.audioImg;
            break;
          case 14:
            this.displayImg = res.sendStickerImg;
            break;
          case 15:
            this.displayImg = res.chatHistoryContactImg;
            break;
          case 16:
            this.displayImg = res.viewStatusImg;
            break;
        }
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess Upload Image', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
  }
  updateHome(body: any,id:number) {
    
    console.log("-----------------updateHome--------------------");
    console.log(body);
    // if (body.lapImg != null) {
    //   body.lapImg= this.displayImg;
    // }
    switch (id) {
      case 1 :
        body.lapImg = this.displayImg;
        break;
      case 2:
        body.chatAppImg = this.displayImg;
        break;
      case 3:
        body.mobileImg = this.displayImg;
        break;
      case 4:
        body.qRcodeImg = this.displayImg;
        break;
      case 5:
        body.userCustamizerImg = this.displayImg;
        break;
      case 6:
        body.rtlImg = this.displayImg;
        break;
      case 7:
        body.filesImg = this.displayImg;
        break;
      case 8:
        body.futcherImg = this.displayImg;
        break;
      case 9:
        body.noteImg = this.displayImg;
        break;
      case 10:
        body.remiderImg = this.displayImg;
        break;
      case 11:
        body.someFutchersImg = this.displayImg;
        break;
      case 12:
        body.darkLightImg = this.displayImg;
        break;
      case 13:
        body.audioImg = this.displayImg;
        break;
      case 14:
        body.sendStickerImg = this.displayImg;
        break;
      case 15:
        body.chatHistoryContactImg = this.displayImg;
        break;
      case 16:
        body.viewStatusImg = this.displayImg;
        break;
    }
    this.http.put('https://localhost:44318/api/Home/UpdateHome', body).subscribe(
      (res: any) => {
        console.log(res);
        // hide spinner
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess Upload Image', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
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
  CreateContact(body:any){
    this.spinner.show();
    this.http.post('https://localhost:44318/api/ContactUs/InsertContact', body).subscribe(
      (res) => {
        debugger
        this.spinner.hide();
        //show toster
        //this.toastr.success('sucssess', '', { positionClass: 'toast-bottom-center' });
      }, err => {
        this.spinner.hide();
        this.toastr.error(err.message, '', { positionClass: 'toast-bottom-center' });
      })
    window.location.reload();
  }

}
