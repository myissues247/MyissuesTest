import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from './services/user-data.service';


@Injectable({
  providedIn: 'root'
})
export class ReceiverGuard implements CanActivate {
  constructor(private router: Router, private ds: UserDataService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('session')) {
        const session = JSON.parse(sessionStorage.getItem('session'))
        if(session.type == 'receiver'){
          return true;
        }
        else{
         this.ds.newMessage('error', 'Not Authorized', 'You have to sign in as a receiver')
          return false;
        } 
      } else {
        this.ds.newMessage('error', 'Login Needed', "Please login to continue")
        console.log('hello');
        this.router.navigate(['/']);
        return false;
      }
  }
  
}
