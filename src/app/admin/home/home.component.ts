import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/Services/admin.service';
import { HomeService } from 'src/app/Services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('callupdateDailog1') callupdateDailog1!: TemplateRef<any>;
  @ViewChild('callupdateDailog2') callupdateDailog2!: TemplateRef<any>;
  @ViewChild('callupdateDailog3') callupdateDailog3!: TemplateRef<any>;
  @ViewChild('callupdateDailog4') callupdateDailog4!: TemplateRef<any>;
  @ViewChild('callupdateDailog5') callupdateDailog5!: TemplateRef<any>;
  @ViewChild('callupdateDailog6') callupdateDailog6!: TemplateRef<any>;
  @ViewChild('callupdateDailog7') callupdateDailog7!: TemplateRef<any>;
  @ViewChild('callupdateDailog8') callupdateDailog8!: TemplateRef<any>;
  @ViewChild('callupdateDailog9') callupdateDailog9!: TemplateRef<any>;
  @ViewChild('callupdateDailog10') callupdateDailog10!: TemplateRef<any>;
  @ViewChild('callupdateDailog11') callupdateDailog11!: TemplateRef<any>;
  @ViewChild('callupdateDailog12') callupdateDailog12!: TemplateRef<any>;
  @ViewChild('callupdateDailog13') callupdateDailog13!: TemplateRef<any>;
  @ViewChild('callupdateDailog14') callupdateDailog14!: TemplateRef<any>;
  @ViewChild('callupdateDailog15') callupdateDailog15!: TemplateRef<any>;
  @ViewChild('callupdateDailog16') callupdateDailog16!: TemplateRef<any>;
  constructor(public home: HomeService, private admin: AdminService, public dialog: MatDialog) { }
  updateForm: FormGroup = new FormGroup({
    homeId: new FormControl(),
    lapImg: new FormControl(),
    chatAppImg: new FormControl(),
    mobileImg: new FormControl(),
    qRcodeImg: new FormControl(),
    userCustamizerImg: new FormControl(),
    rtlImg: new FormControl(),
    filesImg: new FormControl(),
    futcherImg: new FormControl(),
    noteImg: new FormControl(),
    remiderImg: new FormControl(),
    someFutchersImg: new FormControl(),
    darkLightImg: new FormControl(),
    audioImg: new FormControl(),
    sendStickerImg: new FormControl(),
    chatHistoryContactImg: new FormControl(),
    viewStatusImg: new FormControl(),

  })
  p_data: any = {};
  ngOnInit(): void {
    this.home.GetHome();
  }
  updatehomeLab(obj: any,id:number) {
    debugger    
    this.p_data = {
      homeId:1,
      lapImg: obj.lapImg,
      chatAppImg: obj.chatAppImg,
      mobileImg: obj.mobileImg,
      qRcodeImg: obj.qRcodeImg,
      userCustamizerImg: obj.userCustamizerImg,
      rtlImg: obj.rtlImg,
      filesImg: obj.filesImg,
      futcherImg: obj.futcherImg,
      noteImg: obj.noteImg,
      remiderImg: obj.remiderImg,
      someFutchersImg: obj.someFutchersImg,
      darkLightImg: obj.darkLightImg,
      audioImg: obj.audioImg,
      sendStickerImg: obj.sendStickerImg,
      chatHistoryContactImg: obj.chatHistoryContactImg,
      viewStatusImg: obj.viewStatusImg,
    }
    console.log("ggggggggggggggupdatehomeLabgggggggggggggg");
    console.log(this.p_data);
    this.updateForm.controls['homeId'].setValue(this.p_data.homeId);
    this.updateForm.controls['lapImg'].setValue(this.p_data.lapImg);
    this.updateForm.controls['chatAppImg'].setValue(this.p_data.chatAppImg);
    this.updateForm.controls['mobileImg'].setValue(this.p_data.mobileImg);
    this.updateForm.controls['qRcodeImg'].setValue(this.p_data.qRcodeImg);
    this.updateForm.controls['userCustamizerImg'].setValue(this.p_data.userCustamizerImg);
    this.updateForm.controls['rtlImg'].setValue(this.p_data.rtlImg);
    this.updateForm.controls['filesImg'].setValue(this.p_data.filesImg);
    this.updateForm.controls['futcherImg'].setValue(this.p_data.futcherImg);
    this.updateForm.controls['noteImg'].setValue(this.p_data.noteImg);
    this.updateForm.controls['remiderImg'].setValue(this.p_data.remiderImg);
    this.updateForm.controls['someFutchersImg'].setValue(this.p_data.someFutchersImg);
    this.updateForm.controls['darkLightImg'].setValue(this.p_data.darkLightImg);
    this.updateForm.controls['audioImg'].setValue(this.p_data.audioImg);
    this.updateForm.controls['sendStickerImg'].setValue(this.p_data.sendStickerImg);
    this.updateForm.controls['chatHistoryContactImg'].setValue(this.p_data.chatHistoryContactImg);
    this.updateForm.controls['viewStatusImg'].setValue(this.p_data.viewStatusImg);
    switch (id) {
      case 1:
        this.dialog.open(this.callupdateDailog1);
        break;
      case 2:
        this.dialog.open(this.callupdateDailog2);
        break;
      case 3:
        this.dialog.open(this.callupdateDailog3);
        break;
      case 4:
        this.dialog.open(this.callupdateDailog4);
        break;
      case 5:
        this.dialog.open(this.callupdateDailog5);
        break;
      case 6:
        this.dialog.open(this.callupdateDailog6);
        break;
      case 7:
        this.dialog.open(this.callupdateDailog7);
        break;
      case 8:
        this.dialog.open(this.callupdateDailog8);
        break;
      case 9:
        this.dialog.open(this.callupdateDailog9);
        break;
      case 10:
        this.dialog.open(this.callupdateDailog10);
        break;
      case 11:
        this.dialog.open(this.callupdateDailog11);
        break;
      case 12:
        this.dialog.open(this.callupdateDailog12);
        break;
      case 13:
        this.dialog.open(this.callupdateDailog13);
        break;
      case 14:
        this.dialog.open(this.callupdateDailog14);
        break;
      case 15:
        this.dialog.open(this.callupdateDailog15);
        break;
      case 16:
        this.dialog.open(this.callupdateDailog16);
        break;
    }
    

    //    this.home.updateHome(this.updateForm.value);
  }
  
  uploadImage(file: any,id:number) {
    debugger
    if (file.length == 0)
      return;
    let fileToUpload = <File>file[0];//
    const formDate = new FormData();//object 
    formDate.append('file', fileToUpload, fileToUpload.name);
    debugger
    this.home.uploadAttachment(formDate,id);
  }
  updateimage(id:number){
    debugger
    console.log(this.updateForm.value);
    this.home.updateHome(this.updateForm.value,id);
  }

}
