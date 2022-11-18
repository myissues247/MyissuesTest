import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService, UserSession } from '../services/state.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.css']
})
export class SponsorsComponent implements OnInit, OnDestroy {
  session: UserSession;
  unsub;
  constructor(private ss: StateService, private router: Router) { }

  ngOnInit(): void {
    this.unsub = this.ss.getUserSessionObservable().subscribe((session)=>{
      this.session = session;
      if(!this.session._id) {
        this.router.navigate(['/']);
      }
    })
  }
  
  ngOnDestroy() {
    this.unsub.unsubscribe();
  }

}
