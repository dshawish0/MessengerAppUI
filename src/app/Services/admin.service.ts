import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users:any=[];
  numberofuser=0;
  userActiv:any=[];
  numofusersActive=0;

  constructor(public http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) { }
  
  GetAllUser(){
    //show spinner
    this.spinner.show();
    //hits Api
    debugger
    this.http.get('https://localhost:44318/api/User').subscribe(
      (result)=>{
        this.users =result;
        this.numberofuser = this.users.length;
        this.userActiv= this.users.filter((obj:any)=>obj.isActive === 1);
        debugger
        this.numofusersActive=this.userActiv.length;
        console.log(result);
        // hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.success('sucssess');
    },err=>{
        //hide spinner
        this.spinner.hide();
        //show toster
        this.toastr.error('Error');
    })
  }
}
