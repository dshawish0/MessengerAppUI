import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {
 
  // dialog: any;
  // AddServices: any;

  constructor(public admin: AdminService, public dialog: MatDialog) { }
  
  @ViewChild('callCreateDailog') callCreateDailog!: TemplateRef<any>;
  @ViewChild('calldeleteDailog') calldeleteDailog!: TemplateRef<any>;
  @ViewChild('callupdateDailog') callupdateDailog2! :TemplateRef<any>;
  
    createserves: FormGroup = new FormGroup({
    Servicename: new FormControl('', Validators.required),
    Preprice: new FormControl('', Validators.required),
    Saleprice: new FormControl('', Validators.required),
  });

  updateForm:FormGroup=new FormGroup({
    serviceid:new FormControl(),
    servicename:new FormControl(),
    Preprice:new FormControl(),
    saleprice:new FormControl(),
  })
  p_data:any={};

  updateDailog(obj:any){
    this.p_data={
      serviceid:obj.serviceid,
      servicename:obj.servicename,
      preprice:obj.preprice,
      saleprice:obj.saleprice,
    }
    
    console.log(this.p_data);
    this.updateForm.controls['serviceid'].setValue(this.p_data.serviceid); 
    this.dialog.open(this.callupdateDailog2)
  }

 updateser(){
    debugger
    this.admin.Updateservices(this.updateForm.value);
  }
  CreateSer() {
    this.dialog.open(this.callCreateDailog);
  }
  SaveData() {
    this.admin.Createservice(this.createserves.value);
  }

  ngOnInit(): void {
    this.admin.GetAll();
  }

  deleteser(id: number) {
    debugger
    const dialogVal = this.dialog.open(this.calldeleteDailog);
    dialogVal.afterClosed().subscribe(
      (res: any) => {
      if (res != undefined) {
        if (res == 'yes')
          this.admin.deleteservices(id);
        else (res == 'no')
        console.log("Thank you");
      }
    })
  }


  Servicesids:any='';
  
  inputValue(ev:any){
    this.Servicesids=ev.target.value;
    console.log(ev.target.value);
  }

  search(){
    const serviceobj=
    {
    Servicesid:this.Servicesids};
     debugger; 
    this.admin.searchservices(serviceobj.Servicesid);
    }

}
