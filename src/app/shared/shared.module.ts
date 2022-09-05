import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  exports:[
    HttpClientModule,
    MatDialogModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,

  ]
})
export class SharedModule { 
  http:HttpClientModule|undefined
}
