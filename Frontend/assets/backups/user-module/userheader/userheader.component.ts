import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-userheader',
  templateUrl: './userheader.component.html',
  styleUrls: ['./userheader.component.css']
})
export class UserheaderComponent implements OnInit, OnDestroy {
  unsub$ = new Subject();
  session;
  hidden = false;
  constructor(private ss: StateService, private router: Router) { }

  ngOnInit(): void {
     this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
       this.session = session
       if(session.type == 'doner') {
         this.hidden = true;
       }
     });
  }

  take_to_home() : void {
    if(this.session.type == 'agency')
       this.router.navigate(['/agency']);
    else if(this.session.type == 'receiver')
       this.router.navigate(['/receiver']);
    else if(this.session.type == 'doner')
       this.router.navigate(['/doner']);
    else if(this.session.type == 'sponsor')
       this.router.navigate(['/sponsor']);
  }

  take_to_post() : void {
    if(!this.session._id)
      this.ss.openModal({'signIn': true});

    if(this.session.type == 'agency')
      this.router.navigate(['/agency/post/']);
    else if(this.session.type == 'receiver')
      this.router.navigate(['/receiver/post']);
    else if(this.session.type == 'sponsor') 
      this.router.navigate(['/sponsor/post']);
  }

  ngOnDestroy() {
    this.unsub$.unsubscribe();
  }

}
