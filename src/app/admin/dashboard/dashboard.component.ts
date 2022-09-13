import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {Chart,registerables } from 'chart.js'
import jsPDF from 'jspdf';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart:any={};

  constructor( public admin:AdminService) {
    Chart.register(...registerables);
   }

  ngOnInit(): void {
    this.admin.GetAllUser();
    this.admin.getInfoProfile();
    this.admin.GetAll();
    this.admin.GetChart();  
    this.admin.GetRevenue();
    this.admin.GetChart2();
    this.admin.GetPayment();
  } 


  doc:any;
  @ViewChild('content', {static: false}) el !: ElementRef;
  downloadPDF(){

    // debugger
    // this.doc = new jsPDF();
    // this.doc.autoTable({html: '#table'});
    // this.doc.save('datauri','test.pdf');

    let pdf = new jsPDF('p','pt','a1');
    pdf.html(this.el.nativeElement,{
      callback: (pdf)=>{
        //var pageCount = pdf.internal.getNumberOfPages();
        pdf.save("paymetTableDashBoard.pdf");
      }
    })

  }

}
