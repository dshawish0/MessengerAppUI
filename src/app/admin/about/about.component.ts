import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
 
  @ViewChild('callupdateDailog') callupdateDailog!: TemplateRef<any>;
  constructor(public admin:AdminService,public dialog: MatDialog) { }
  updateForm: FormGroup = new FormGroup({
    aboutUsId: new FormControl(),
    text: new FormControl(),
    email: new FormControl(),
    imgPaht: new FormControl(),
  })
  ngOnInit(): void {
    this.admin.GetAboutUs();
  }
  p_data: any = {};
  updateDailog(obj:any){
    this.p_data = {
        aboutUsId: obj.aboutUsId,
        text: obj.text,
        email: obj.email,
        imgPaht: obj.imgPaht    
    }
    console.log(this.p_data);
    this.updateForm.controls['aboutUsId'].setValue(this.p_data.aboutUsId);
    this.updateForm.controls['imgPaht'].setValue(this.p_data.imgPaht);
    this.dialog.open(this.callupdateDailog)
  }
  uploadImage(file: any) {
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];//
    const formDate = new FormData();//object 
    formDate.append('file', fileToUpload, fileToUpload.name);
    debugger
    this.admin.uploadAttachmentAbout(formDate);
  }
  updateAbout() {
    debugger
    console.log(this.updateForm.value);
    this.admin.UpdateAbout(this.updateForm.value);
  }
}
