import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  createcontact: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.required),
    Email: new FormControl('', Validators.required),
    Message: new FormControl('', Validators.required),
  });
  constructor(public home: HomeService) { }
  ngOnInit(): void {
  }
  SaveData(){
    debugger
    this.home.CreateContact(this.createcontact.value)
  }

}
