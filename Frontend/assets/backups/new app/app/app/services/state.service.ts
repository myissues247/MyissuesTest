import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface UserSession {
  _id : string,
  firstname? : string,
  lastname? : string,
  agencyTitle?: string,
  sponsorTitle? : string,
  balance : number,
  email : string,
  type : string,
  status : any,
  access: number,
  account : number,
  bumps : number,
  verificationStatus: number;
}
@Injectable({
  providedIn: 'root'
})
export class StateService {
  modalOpenClose$ = new Subject();
  userSession : UserSession;
  userSession$ : BehaviorSubject<UserSession>;
  constructor() { 
    if(sessionStorage.getItem('session')) {
      this.userSession = JSON.parse(sessionStorage.getItem('session'))
    } else {
      this.userSession = {_id: "", firstname: "", lastname: "", agencyTitle: "", sponsorTitle: "", balance: 0.00, email : "", type: 'guest', status: false, access: 0, account: 0, bumps: 0, verificationStatus : 0}
    }
    this.userSession$ =  new BehaviorSubject(this.userSession);
  }

  setUserSession(session) : void{
    sessionStorage.setItem('session', JSON.stringify(session));
    this.userSession = session;
    this.userSession$.next(this.userSession);
  }

  getUserSessionObservable() : Observable<UserSession>{
    return this.userSession$.asObservable();
  }

  bumpsAdd(count) {
    this.userSession.bumps = count;
    this.setUserSession(this.userSession);
  }
  
  verificationStatusChange(status) {
    this.userSession.verificationStatus = status;
    this.setUserSession(this.userSession);
  }

  toCache(key, data){
    const dataString = JSON.stringify(data);
    sessionStorage.setItem(key, dataString);
  }

  fromCache(key){
    const data = sessionStorage.getItem(key);
    const jsonData = JSON.parse(data);
    return jsonData; 
  }

  logout() {
    sessionStorage.removeItem('session');
    this.userSession = {_id: "", firstname: "", lastname: "", agencyTitle: "", sponsorTitle: "", balance: 0.00, email : "", access: 0,  type: 'guest', status: false, account: 0, bumps: 0, verificationStatus : 0};
    this.userSession$.next(this.userSession);
  }


  openCloseObservable() : Observable<any> {
    return this.modalOpenClose$.asObservable();
  }

  // {signUp: true, signIn: false}
  openModal(data)  {
    this.modalOpenClose$.next(data);
  }
}
