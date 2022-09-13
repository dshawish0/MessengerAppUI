import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import jsPDF from "jspdf";
import "jspdf-autotable";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(public admin:AdminService) { }

  ngOnInit(): void {
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
        pdf.save("PaymetTable.pdf");
      }
    })

  }

}
