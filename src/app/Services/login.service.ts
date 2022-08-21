import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  obj:any;

  constructor(private http:HttpClient) { }


  submit(email:any,password:any){


    var body ={
      Email :email.toString(),
      Password:password.toString()
    }

const headerDir={
  'Contant-Type':'application/json',
  'Accept':'application/json'
}
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }

    this.http.post('https://localhost:44318/api/Login',body,requestOptions).subscribe
    ((resp)=>{
      const responce ={
        token:resp.toString()
      }
      localStorage.setItem('token',responce.token);
      let data :any = jwt_decode(responce.token);
      console.log(data);
      console.log("dsadsad");
      localStorage.setItem('user',JSON.stringify({...data}) );
      if(data.role=='admin')
      {
       
      }
      else if (data.role=='customer')
      {
        
      }
    })



  }

  

  RestPassowrd(email:any){

    var body ={
      Email :email.toString(),
    }

const headerDir={
  'Contant-Type':'application/json',
  'Accept':'application/json'
}
    const requestOptions={
      headers:new HttpHeaders(headerDir)
    }

    this.http.post('https://localhost:44318/api/Login/getLogByEmail',body,requestOptions).subscribe(
      (resp)=>{

        this.obj =resp;

        //console.log(this.obj)

        //console.log(JSON.parse(resp.toString()));

        
        

    },err =>{

    })

  }

updatePassowrd(password:any){

  var body ={
    loginId:this.obj.loginId,
    Email :this.obj.Email,
    Password:password,
    user_Id:this.obj.user_Id,
    roleId: this.obj.roleId,
    userName:this.obj.userName,
    verificationCode:this.obj.verificationCode
  }
  console.log(body);
   this.http.put('https://localhost:44318/api/Login/restPassword/'+this.obj.loginId,body).subscribe(
       (resp)=>{


        
        

     },err =>{

     })
}


}


