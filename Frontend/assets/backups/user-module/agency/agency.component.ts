import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit, AfterViewInit {
  city;
  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() : any {  }

}
