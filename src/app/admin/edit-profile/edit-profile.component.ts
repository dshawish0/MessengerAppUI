import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(public admin:AdminService) { }
  updateForm : FormGroup = new FormGroup({
    userId:new FormControl(''),
    fname:new FormControl(''),
    lname:new FormControl(''),
    gender:new FormControl(''),
    userName:new FormControl(''),
    proFileImg:new FormControl(''),
    userBio:new FormControl(''),
  })
  p_data:any={};
  ngOnInit(): void {
    this.p_data={
      userId:this.admin.UserInfo.userId,
      fname:this.admin.UserInfo.fname,
      lname:this.admin.UserInfo.lname,
      gender:this.admin.UserInfo.gender,
      userName:this.admin.UserInfo.userName,
      proFileImg:this.admin.UserInfo.proFileImg,
      userBio:this.admin.UserInfo.userBio,
    }
    console.log(this.p_data);
    this.updateForm.controls['userId'].setValue(this.p_data.userId);
    
  }
  uploadImg(file:any){
    if(file.length==0)
      return ; 
    let fileToUpload=<File>file[0];//
    const formDate=new FormData();//object 
    formDate.append('file',fileToUpload,fileToUpload.name);
    debugger

    this.admin.uploadAttachment(formDate);

  }
  updateProfile(){
    this.updateForm.controls['userId'].setValue(this.p_data.userId);
    this.updateForm.controls['proFileImg'].setValue(this.p_data.proFileImg);
    this.admin.UpdateUser(this.updateForm.value);
  }
  
  
}
