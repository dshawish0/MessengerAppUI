import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  @ViewChild('callupdateDailog') callupdateDailog!: TemplateRef<any>;
  constructor(public admin:AdminService,public dialog: MatDialog) { }

  updateForm: FormGroup = new FormGroup({
    contactUsId: new FormControl(),
    fullName: new FormControl(),
    email: new FormControl(),
    message: new FormControl(),
  })
  ngOnInit(): void {
    this.admin.GetContactUs();
  }
  p_data: any = {};
  updateDailog(obj:any){
    this.p_data = {
      contactUsId: obj.contactUsId,
      fullName: obj.fullName,
      email: obj.email,
      message: obj.message    
    }
    console.log(this.p_data);
    this.updateForm.controls['contactUsId'].setValue(this.p_data.contactUsId);
    this.dialog.open(this.callupdateDailog)
  }

  updateContact() {
    debugger
    console.log(this.updateForm.value);
    this.admin.UpdateContact(this.updateForm.value);
  }

}
