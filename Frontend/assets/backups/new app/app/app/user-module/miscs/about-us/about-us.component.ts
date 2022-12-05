import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

  constructor(private ss: StateService) { }

  ngOnInit(): void {
  }
  
  openRegister() {
    this.ss.openModal({signUp: true});
  }

}
