import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loader$ = new Subject();
  constructor() { }
  
  loader() : Observable<any> {
     return this.loader$.asObservable();
  }

  start() : any {
    this.loader$.next({state: true, amount: "40%"});
  }

  load(amount, message="") : void {
    this.loader$.next({state: true, amount: amount + "%", message: message});
  }

  stop() : void {
    this.loader$.next({state: false, amount: "0%"});
  }

}
