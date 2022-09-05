import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService, Spinner } from "ngx-spinner";
import { AdminService } from 'src/app/Services/admin.service';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public admin:AdminService) { }



  ngOnInit(): void {
    this.admin.GetAllReport();
  }
 
  
  userName: any = '';
  inputValue(ev: any) {
    this.userName = ev.target.value;
    console.log(ev.target.value);
  }
  search() {
    const reportobj =
    {
      reportid: this.userName.toString()
    };
    debugger;
    if(this.userName != ''){
      this.admin.searchReport(this.userName);
    }
    else{
      this.admin.GetAllReport();
    }
    
}
Accept(accept:any){
  console.log(accept);
  this.admin.Accepts(accept);
}
Regect(Regect:any){
  console.log(Regect);
  this.admin.Regects(Regect);
}

}
