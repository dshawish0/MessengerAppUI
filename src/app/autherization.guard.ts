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
        debugger
        if(state.url.indexOf('Admin')>=0){
          let data :any = jwt_decode(token);

          if(data.role=='admin'){
            this.router.navigate(['Admin']);
            return true;
          }
          else{
            this.router.navigate(['Chat']);
            return false;
          }
        }
        return true;
      }
      else{
        this.router.navigate(['log']);
        return false;
      }
  }
  
}
