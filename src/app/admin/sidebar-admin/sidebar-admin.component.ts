import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.css']
})
export class SidebarAdminComponent implements OnInit {

  constructor(private router:Router,public admin:AdminService) { }

  ngOnInit(): void {
  }
  logout(){
    let token:any = localStorage.getItem('token');
    let data :any = jwt_decode(token);
    this.admin.logout(data['nameid']);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
