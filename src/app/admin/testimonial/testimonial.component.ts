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
  publishdate:any = '';
  inputValue(ev: any) {
    this.publishdate = ev.target.value;
    console.log(ev.target.value);
  }
  search(){
    const serchUserId =
    {
      publishdate: this.publishdate.toString()
    };
    debugger;
    if(this.publishdate !='')
      this.admin.Searchpublishdate(serchUserId);
  }
}
