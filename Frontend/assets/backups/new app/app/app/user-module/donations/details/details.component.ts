import { NumberFormatStyle } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServerResponse } from 'src/app/services/dataModels';
import { adData, AdSmall, DonationsService, Guest } from 'src/app/services/donations.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, OnDestroy {
  unsub$ = new Subject()
  submitting: boolean = false;
  loading : boolean = false;
  _tip: number = 15;
  get tip() : number{
    return this._tip;
  }
  set tip(tip: number){
    this._tip = tip;
    this.calcTotal();
  }
  donationAmount: number = 0; // entered amount
  totalDonation : number = 0; // after tip
  tipInput: boolean = false;
  get tipInAmount() : number{
    return Number((this.donationAmount * (this.tip/100)).toFixed(2));
  }
  guest : Guest; //if guest then guest data.
  regular : any; // if pays as regular registered user;
  mode : string; //either guest or registered user
  adId: string;
  adData : AdSmall = {} as AdSmall; // contains ad details for passing and displaying 
  logged: boolean; // tracks user login
  constructor(private ar: ActivatedRoute, private ds: UserDataService, private state: StateService, private ss: DonationsService, private router: Router, private loader: LoaderService) { 
    this.guest = {
      firstName : "",
      lastName : "",
      message: "",
      email : "",
      country: "",
      zipCode: "", 
      photo: null,
    }
    this.regular = {
      message: "",
      photo: null,
    }
  }

  ngOnInit(): void {
     this.state.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
       if(session instanceof Object) {
         if(session._id) {
           this.logged = true;
         } else {
           this.logged = false;
         }
       }
       this.mode = this.logged? 'regular' : 'guest';
     });

     this.ss.donationAdObservable().pipe(takeUntil(this.unsub$)).subscribe((adData)=>{
      if(!(adData instanceof Object && adData._id))
        //if not present in service check ad id in params 
        this.ar.queryParams.subscribe((data)=>{
          if(!data.adId){
            return alert('no receiving profile choosen'); //stop
          }
          //if ad id available get data from server 
          this.getAdDataFromServer(data.adId);
        }) 
      this.adData= adData;
     })
  }
  
  //gets ad data from server()
  getAdDataFromServer(adId){
    this.spinner(true);
    this.ds.get_ads_single(adId).pipe(takeUntil(this.unsub$)).subscribe((response: ServerResponse)=>{
      this.spinner(false);
      if(response.status){
        this.ss.setDonationAdId(response.data);
      } else {
        console.log(response);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        alert('sorry couldn\'t connect to the server');
      else 
        alert(error.status + " : " + error.error.message);
      this.spinner(false);
    })
  }
   
  //on donation amount change change change donationAmount if new value not NAN.
  donationChange(event) {
    const amount = event.target.value;
    if(isNaN(amount))
      return event.target.value = this.donationAmount? this.donationAmount : ''
    this.donationAmount = Number(Number(amount).toFixed(2));
    console.log(this.donationAmount)
    this.calcTotal();
  }
  
  //on tip change
  tip_select(event){
    const value = event.target.value;
    console.log(value);
    if(value == 'other'){
      console.log('yes');
      this.tip = null;
      this.tipInput = true;
      return ;
    }
    this.tip = value;
    return this.tipInput = false;
  }
  
  //calculates total donation whenever tip or donationAmount changes.
  calcTotal(): void{
    this.totalDonation = this.donationAmount + (this.donationAmount * (this.tip / 100));
    this.totalDonation = Number(this.totalDonation.toFixed(2));
  }

  changeFile(event){
    if(this.mode == 'regular' && this.logged == true)
       this.regular.photo = event.target.files[0];    
    else 
       this.guest.photo = event.target.files[0];
  }
  
  
  //submits guest data or regular user data to service for passing to next page.
  submitData(form){
    if(form.status == "INVALID")
      return this.ds.newMessage('error', 'Incorrect Form', 'Please fill the required values correctly');
    if(this.totalDonation == 0) 
      return alert('Please enter an amount');
    if(this.totalDonation < 0) 
      return alert('Amount not valid');
    if(this.donationAmount > 100000)
      return alert('Please enter Donation Amount smaller than $100000');
    if(!confirm('You are going to donate $'+this.donationAmount + ' with a tip of $' + this.tip + ', total to pay is $' + this.totalDonation + '. Do you want to proceed?'))
      return;

    this.ss.setDonationDAta({
      adId : this.adData._id,
      guest : this.mode=='guest'?this.guest : null,
      regular : this.mode =='regular'?this.regular : null,
      donerType : this.mode, 
      paymentIntent: null,
      tip : this.tip,
      amount : this.totalDonation
    })
    this.router.navigate(['/donate/pay']);
  }

  signIn(loginData, modalCloseButton){
    console.log(loginData);
    this.ds.GetUser(loginData).subscribe((response: ServerResponse)=>{
      if(response.status) {
        this.mode = 'regular';
        this.ds.newMessage('success', 'Authenticated', 'You are signed in authenticated');
        this.state.setUserSession(response.data);
        modalCloseButton.click();
      } else {
        console.log(response);
        this.ds.newMessage('error', 'Couldn\'t Authenticate', 'soryy dear but wrong credentials');
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
      this.ds.newMessage('error', 'Error Occured','client couldn\'t connect to the url');
      else 
        this.ds.newMessage('error', 'Couldn\'t Authenticate',error.status + " : " + error.error.message);
    })
  }

  spinner(status) {
    this.loading = status;
    this.submitting = status;
  }


  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }
  
  openSign() {
    this.state.openModal({signIn: true});
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
