import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  layout$ = new BehaviorSubject({})
  siteSetting = null;
  constructor() { }

  newSiteSetting(siteSetting) {
    this.siteSetting = siteSetting;
    this.layout$.next(this.siteSetting);
  }

  layout() : Observable<any> {
    return this.layout$.asObservable();
  }


}
