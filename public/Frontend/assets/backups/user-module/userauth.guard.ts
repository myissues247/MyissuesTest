import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { UserDataService } from '../services/user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserauthGuard implements CanActivate {
  status;
  constructor(private ds: UserDataService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((res, rej) => {
      this.ds.Auth({}).subscribe(( (response) => {
        if (response.status == true) {
          res(true);
        }
        else {
          alert('Please Sign In')
          this.router.navigate['/']
          res(false)
        }
      }))
    })
  
  }

}


