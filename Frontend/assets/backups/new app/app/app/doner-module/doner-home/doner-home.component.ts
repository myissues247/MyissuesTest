import { Component, OnInit } from '@angular/core';
import { StateService, UserSession } from 'src/app/services/state.service';

@Component({
  selector: 'app-doner-home',
  templateUrl: './doner-home.component.html',
  styleUrls: ['./doner-home.component.css']
})
export class DonerHomeComponent implements OnInit {
  session : UserSession;
  constructor(private ss: StateService) { }

  ngOnInit(): void {
    this.ss.getUserSessionObservable().subscribe((session)=>{
      this.session = session;
    });
  }

}
