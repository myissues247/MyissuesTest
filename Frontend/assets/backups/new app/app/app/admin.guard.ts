import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from './services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private ds: UserDataService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('admin')) {
        const session = JSON.parse(sessionStorage.getItem('admin'))
        if(session.type == 'admin'){
          return true;
        }
        else{
          this.ds.newMessage('error', 'Not Authorized', 'You have to sign in as an admin')
           return false;
         } 
       } else {
         this.ds.newMessage('error', 'Login Needed', "Please Log in to continue")
         this.router.navigate(['/admin-module/signin']);
         return false;
       }
  }
  
}
