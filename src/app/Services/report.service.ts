import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(public http:HttpClient,private spinner:NgxSpinnerService,private toastr:ToastrService) { }

  reports: any = [];
  GetAll() {
    this.spinner.show();
    this.http.get('https://localhost:44318/api/ReportUser/GetReportUsers').subscribe(
      (res) => {
        this.spinner.hide();
        this.reports = res;
        this.toastr.success("getAll success");
        console.log(res);
       
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message);
      })
  }
  CreateRrport(body:any){
    debugger 
    this.spinner.show();
    this.http.post('https://localhost:44318/api/ReportUser/Create',body).subscribe(
      (res)=>{
        this.spinner.hide();
        this.toastr.success("Created success");
    },err=>{
      this.spinner.hide();
      this.toastr.error("Error");
      this.toastr.error(err.message);
    })
    window.location.reload();
  }
  updateReport(body:any) {
    debugger
    this.spinner.show();
    this.http.put('https://localhost:44318/api/ReportUser/Update',body).subscribe(
      (res)=>{
        this.spinner.hide();
        this.toastr.success("Updated success");
    },err=>{
      this.spinner.hide();
      this.toastr.error("Error");
        this.toastr.error(err.message);
    })
    window.location.reload();
  }
  deleteReport(id: number) {
    this.spinner.show();
    this.http.delete('https://localhost:44318/api/ReportUser/DeleteReportUser/'+ id).subscribe(
      (res) => {
        console.log('deleted');
        this.spinner.hide();
        this.toastr.success('Deleted success');
      }, err => {
        this.spinner.hide();
        this.toastr.error("Error");
        this.toastr.error(err.message);
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
}
