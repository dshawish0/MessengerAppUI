import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( public admin:AdminService) { }

  ngOnInit(): void {
    this.admin.GetAllUser();
    this.admin.getInfoProfile();
  }

}
