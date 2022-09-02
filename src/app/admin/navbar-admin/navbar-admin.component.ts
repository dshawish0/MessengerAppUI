import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import jwt_decode from "jwt-decode";
@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor(private router:Router,public admin:AdminService) { }

  ngOnInit(): void {
    this.admin.GetAllReport();
  }
  logout(){
    let token:any = localStorage.getItem('token');
    let data :any = jwt_decode(token);
    this.admin.logout(data['nameid']);
    localStorage.clear();
    this.router.navigate(['']);
  }
}
