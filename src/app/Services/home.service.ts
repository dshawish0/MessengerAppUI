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
    debugger
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
