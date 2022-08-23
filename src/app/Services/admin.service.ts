import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  users: any = [];
  numberofuser = 0;
  userActiv: any = [];
  numofusersActive = 0;

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
  }
  SearchUserName(name:any){
    this.spinner.show();
    debugger
    this.http.get('https://localhost:44318/api/User/GetUserByUserName/'+ name).subscribe(
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
}
