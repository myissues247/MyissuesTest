import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.css']
})
export class HowItWorksComponent implements OnInit {

  constructor(private ss: StateService) { }

  ngOnInit(): void {
  }
  
  openRegister() {
    this.ss.openModal({
      signUp: true,
      signIn: false
    });
		window.scrollTo(0, 0)
  }

}
 