import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AutherizationGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      const token = localStorage.getItem('token');

      if(token){
        // debugger
        
          let data :any = jwt_decode(token);

          if(data.role=='admin' && state.url.indexOf('admin')>=0){
            // this.router.navigate(['admin']);
            return true;
          }
          else if(data.role=='user' && state.url.indexOf('Chat')>=0){
            // this.router.navigate(['Chat']);
            return true;
          }
          else{
            this.router.navigate(['log']);
            return false;
          }
      }
      else{
        this.router.navigate(['log']);
        return false;
      }
  }
  
}
