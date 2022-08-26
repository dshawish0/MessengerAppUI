import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor(public admin: AdminService) { }

  ngOnInit(): void {
    this.admin.GetAlltestimonial();
  }
  Accept(id:any){
    this.admin.AcceptTest(id);
  }
  Reject(id:any){
    this.admin.RejectTest(id);
  }
  UserId:any = '';
  inputValue(ev: any) {
    this.UserId = ev.target.value;
    console.log(ev.target.value);
  }
  search(){
    const serchUserId =
    {
      UserId: this.UserId.toString()
    };
    debugger;
    if(this.UserId!='')
      this.admin.SearchUserById(serchUserId);
  }
}
