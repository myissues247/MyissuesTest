import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserDataService } from './services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class RestrictionGuard implements CanActivate {
  constructor(private router: Router, private ds: UserDataService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if(sessionStorage.getItem('session')) {
      const session = JSON.parse(sessionStorage.getItem('session'))
      if(session.access == 2) {
        return true;
      } else if(session.access == 1) {
        this.ds.newMessage('error', 'Not Authorized', 'You are not verified yet, we will inform you when get verified');
        return false;
      }
    } else {
      this.ds.newMessage('error', 'Not Authenticated', 'Please Login to Continue');
      this.router.navigate(['/']);
      return false;
    }
     
  }
  
}
