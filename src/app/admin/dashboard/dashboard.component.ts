import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import {Chart,registerables } from 'chart.js'
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

}
