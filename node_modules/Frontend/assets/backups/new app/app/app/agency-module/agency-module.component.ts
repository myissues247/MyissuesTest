import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { StateService, UserSession } from '../services/state.service';

@Component({
  selector: 'app-agency-module',
  templateUrl: './agency-module.component.html',
  styleUrls: ['./agency-module.component.css']
})
export class AgencyModuleComponent implements OnInit {
  session: UserSession;
  unsub;
  constructor(private ss: StateService, private router: Router) { }

  ngOnInit(): void {
    this.unsub = this.ss.getUserSessionObservable().subscribe((session)=>{
      this.session = session;
      if(!this.session._id) {
        this.router.navigate(['']);
      }
    })
  }

  ngOnDestroy(): void {
    this.unsub.unsubscribe();
  }



}
