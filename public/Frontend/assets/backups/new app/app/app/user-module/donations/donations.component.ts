import { Component, OnDestroy, OnInit } from '@angular/core';
import { DonationsService } from 'src/app/services/donations.service';


@Component({
  selector: 'app-donations',
  templateUrl: './donations.component.html',
  styleUrls: ['./donations.component.css']
})
export class DonationsComponent implements OnInit, OnDestroy {
 constructor(private ss: DonationsService) {

 }
 ngOnInit(): void{
}

 ngOnDestroy() : void {
   this.ss.setDonationAdId(null);
 }
}
