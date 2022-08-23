import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {

  constructor(public admin: AdminService) { }

  ngOnInit(): void {
    this.admin.GetAllUser();
  }
  Block(id:any){
    this.admin.BlockUser(id);
  }
  UnBlock(id:any){
    this.admin.UnBlockUser(id);
  }
  userName: any = '';
  inputValue(ev: any) {
    this.userName = ev.target.value;
    console.log(ev.target.value);
  }
  search(){
    const userblock =
    {
      userName: this.userName.toString()
    };
    debugger;
    if(this.userName!='')
      this.admin.SearchUserName(this.userName);
  }


}
