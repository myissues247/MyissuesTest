import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Guest {
  firstName: string,
  lastName: string,
  email : string,
  country: string,
  zipCode: string,
  message?: string,
  photo? : File
}

export interface adData {
  _id: string
  identityImage : string,
  receiverId : string,
  firstName : string,
  lastName : string,
  age : number,
  city : string,
  //profileId : string
}

export interface Donation {
  adId: string,
  amount: number,
  tip: number,
  paymentIntent: string,
  donerType: string,
  guest? : Guest | null; 
  regular? : any;
}

export interface AdSmall{
  _id: string,
  receiverId : string,
  firstName : string,
  lastName : string,
  sponsorTitle: string,
  agencyTitle: string,
  categoryName : string,
  adTitle : string,
  city : string,
  age : number,
  adImages: string[],
  approvedOn : string,
  advertisePlanCheck: boolean,
  boosted? : boolean
}

@Injectable({
  providedIn: 'root'
})
export class DonationsService {
  donation$ = new BehaviorSubject({}) //handles donation data.
  donation: Donation; //contains donation data.
  donationAd$ = new BehaviorSubject({}); // handles data of ad which is selected for donation;
  constructor() { }
    // subscribes to know selected ad for donation 
    donationAdObservable() : Observable<any>{
      return this.donationAd$.asObservable();
    }
    // passes selected ad data to subscriber(donation component mostly)
    setDonationAdId(adData : AdSmall): void {
       this.donationAd$.next(adData);
    }

    donationObservable(): Observable<any>{
      return this.donation$.asObservable();
    }

    setDonationDAta(data) : void {
      this.donation$.next(data);
    }
      
}
