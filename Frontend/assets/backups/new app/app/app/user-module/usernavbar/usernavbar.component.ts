import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from 'src/app/services/layout.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit, OnDestroy {
  session;
  notifs: IDBObjectStore;
  db: IDBDatabase;
  dbReq : IDBOpenDBRequest;
  unsubscribe$;
  showNotification : boolean =  false;
  logo;
  
  constructor(private ss: StateService, private router: Router, private ds: UserDataService, private layout: LayoutService) { 
   if(window.indexedDB) {
    this.dbReq = indexedDB.open('myissues', 1);
    this.dbReq.onupgradeneeded = (event : IDBVersionChangeEvent) => {
      this.db = this.dbReq.result ; 
      this.notifs = this.db.createObjectStore('notifs', {autoIncrement: true})
     }; 
    this.dbReq.onsuccess = function hello(event) {
      this.db = this.dbReq.result;
    }.bind(this)

    this.dbReq.onerror = (event) => {
      console.log(this.dbReq.error.code);
    }
   } 
  }

  ngOnInit(): void {
    this.unsubscribe$ = this.ss.getUserSessionObservable().subscribe((session)=>{
      this.session = session;
      console.log(this.session);
    });

    this.layout.layout().subscribe((response)=>{
      this.logo = environment.server + '/' +  response.imagePath
    })
  }

  ngOnDestroy() : void {
    this.db.close();
    this.unsubscribe$.unsubscribe();
  }

  account() {
    if(this.session.type == 'agency') 
      this.router.navigate(['/agency/verification']);
    else if(this.session.type == 'doner') 
      this.router.navigate(['/doner/verification']);
    else if(this.session.type == 'receiver')
      this.router.navigate(['/receiver/verification']);
    else if(this.session.type == 'sponsor')
      this.router.navigate(['/sponsor/verification']);
  }

  logout() {
    this.ds.logout().subscribe((response)=>{
      if(response.status) {
        this.ss.logout();
        this.router.navigate(['/']);
      } else {
        this.ds.newMessage('error', 'couldn\'t Log Out', 'Failed to log out');
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        this.ds.newMessage('error', 'Unknown Error Occured', 'Sorry some unknown error occured on the browser');
      else 
        this.ds.newMessage('error', 'Couldn\'t Log Out', "Sorry couldn't log out");
    })
  }

  login() {
     this.ss.openModal({signIn: true, signUp: false})
  }

  signUp() {
    this.ss.openModal({signIn: false, signUp: true})
  }
}
 