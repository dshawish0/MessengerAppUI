import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @ViewChild('callupdateDailog') callupdateDailog2!: TemplateRef<any>;

  constructor(public admin: AdminService, public dialog: MatDialog) { }

  updateForm: FormGroup = new FormGroup({
    footerId: new FormControl(),
    logoImg: new FormControl(),
    text: new FormControl(),
    location: new FormControl(),
    phoneNumber: new FormControl(),
    email: new FormControl()
  })
  ngOnInit(): void {
    this.admin.GetAllFooter();
  }
  p_data: any = {};
  updateDailog(obj:any) {
    debugger
    console.log(obj);
    this.p_data = {
      footerId: obj.footerId,
        logoImg: obj.logoImg,
        text: obj.text,
        location: obj.location,
        phoneNumber: obj.phoneNumber,
        email: obj.email
    }
    console.log(this.p_data);
    this.updateForm.controls['footerId'].setValue(this.p_data.footerId);
    this.updateForm.controls['logoImg'].setValue(this.p_data.logoImg);
    this.dialog.open(this.callupdateDailog2)
  }
  uploadImage(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];//
    const formDate = new FormData();//object 
    formDate.append('file', fileToUpload, fileToUpload.name);
    debugger
    this.admin.uploadAttachment(formDate);
  }
  updatefooter() {
    debugger
    console.log(this.updateForm.value);
    this.admin.UpdateFooter(this.updateForm.value);
  }

}
