import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReportService } from 'src/app/Services/report.service';
import { NgxSpinnerService, Spinner } from "ngx-spinner";
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  @Input() reportUserId: number |undefined;
  @Input() userReportedId: number | undefined;
  @Input() reportText: string | undefined;
  @Input() status: number | undefined;
  @Input() reportDate: Date|undefined;
  @Input() user_Id: number | undefined;


  constructor(public report: ReportService,public dialog: MatDialog,private spinner:NgxSpinnerService) { }
  @ViewChild('callCreateDailog') callCreateDailog!: TemplateRef<any>;
  @ViewChild('callupdateDailog') callupdateDailog!: TemplateRef<any>;
  @ViewChild('calldeleteDailog') calldeleteDailog!: TemplateRef<any>;


  ngOnInit(): void {
    this.report.GetAll();
  }
  createreport: FormGroup = new FormGroup({
    userReportedId: new FormControl('', Validators.required),
    reportText: new FormControl('', Validators.required),
    // status: new FormControl('', Validators.required),
    reportDate: new FormControl('', Validators.required),
    user_Id: new FormControl('', Validators.required),
  });
  updatereport: FormGroup = new FormGroup({
    reportUserId: new FormControl('', Validators.required),
    userReportedId: new FormControl('', Validators.required),
    reportText: new FormControl('', Validators.required),
    // status: new FormControl('', Validators.required),
    reportDate: new FormControl('', Validators.required),
    user_Id: new FormControl('', Validators.required),
  });

  // Create Report
  CreateRep(){
    this.dialog.open(this.callCreateDailog);
  }
  SaveData(){
    this.report.CreateRrport(this.createreport.value);
  }

  // Update Report
  p_data: any = {};
  updateDailog(body:any){
    this.p_data = {
      reportUserId:body.reportUserId,
      userReportedId: body.userReportedId,
      reportText: body.reportText,
      status:body.status,
      reportDate: body.reportDate,
      user_Id: body.user_Id,
    }
    console.log(this.p_data);
    this.updatereport.controls['reportUserId'].setValue(this.p_data.reportUserId);
    this.dialog.open(this.callupdateDailog);
  }
  UpdateRep() {
    this.report.updateReport(this.updatereport.value);
  }

  // Delete Report
  deleteRep(id:any){
    const dialogVal = this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe(
      (result) => {
        if (result != undefined) {
          if (result == 'yes')
            this.report.deleteReport(id);
          else (result == 'no')
          console.log("Thank you");
        }
      })
  }

  reportid: any = '';
  inputValue(ev: any) {
    this.reportid = ev.target.value;
    console.log(ev.target.value);
  }
  search() {
    const reportobj =
    {
      reportid: this.reportid.toString()
    };
    debugger;
    this.report.searchReport(this.reportid);
  }
}
