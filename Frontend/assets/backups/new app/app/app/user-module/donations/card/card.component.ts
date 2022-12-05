import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService} from '../../../services/user-data.service';
import { DonationsService, Donation, AdSmall } from '../../../services/donations.service';
import { ServerResponse } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService, UserSession } from 'src/app/services/state.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import {Subject} from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, AfterViewInit, OnDestroy {
  unsub$ = new Subject();
  
  submitting: boolean = false;
  loading : boolean = false;
  chargeToken: String
  @ViewChild('cardInfo') cardInfo: ElementRef; 
  card: any;
  clientSecret: string;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  donationData: Donation;
  adData : AdSmall = {} as AdSmall; // contains ad details for passing and displaying 

  country: string;
  zipCode : string;
  name  : string;
  address : string;

  email: string;
  
  selectedCountryCode;
  selectedState;

  states = [];
  cities = [];
  constructor(private cd: ChangeDetectorRef, private ds: UserDataService, private dns: DonationsService, private router: Router, private loader: LoaderService, private ss: StateService) { }
  
  ngOnInit(): void {
    //selected ad data.
    this.dns.donationAdObservable().pipe(takeUntil(this.unsub$)).subscribe((adData)=>{
      if(!(adData instanceof Object && adData._id)){
         alert('please choose an ad');   
         return this.router.navigate(['/ads/view']);  
      }
      this.adData= adData;
    });

    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      if(session._id) {
        if(session.type == 'agency')
          this.name = session.agencyTitle;
        else if(session.type == 'sponsor')
          this.name = session.sponsorTitle
        else 
          this.name = session.firstname + " " + session.lastname;

        this.email = session.email;
      }
    })

    this.checkDonationData();

  }
  
  ngOnDestroy() {
      if (this.card) {
        // We remove event listener here to keep memory clean
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
      }
      
      sessionStorage.removeItem('photo');

      this.unsub$.next();
      this.unsub$.complete();
  }

  ngAfterViewInit() {
      this.initiateCardElement();
  }

  checkDonationData(){
      //gets the donation data from the service.
      this.dns.donationObservable().pipe(takeUntil(this.unsub$)).subscribe((donationData: Donation)=>{
        if(!donationData.adId){
            alert('no ad choosen');
            return this.router.navigate(['/ads/view']);
        } 
        if(donationData.donerType=='guest' && donationData.guest instanceof Object &&!donationData.guest.email) {
            alert('please fill the data correctly');
            this.router.navigate(['/ads/donation']);
        } else if(donationData.donerType=='regular' && !(donationData.regular instanceof Object)) {
            alert('sorry something went wrong');
            this.router.navigate(['/ads/view']);
        } 
        this.donationData = donationData;
        if(this.donationData.donerType == 'guest'){
          console.log('why are we here');
          console.log(this.donationData);
          this.name = donationData.guest.firstName + " " + donationData.guest.lastName;}
        this.getPaymentIntent(this.donationData.amount); //get payment intent with specified amount
      });
  }

  initiateCardElement() {
      // Giving a base style here, but most of the style is in scss file
      const cardStyle = {
          base: {
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                  color: '#aab7c4',
              },
          },
          invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
          },
      };
      this.card = elements.create('card', {style: cardStyle, hidePostalCode: true});
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener('change', this.cardHandler);
  }

  onChange({error}) {
          if (error) {
              this.cardError = error.message;
          } else {
              this.cardError = null;
          }
          this.cd.detectChanges();
  }

  async createStripeToken(form) {
      if(form.status == 'INVALID')
        return alert("Please fill the required fields correctly");
      const formValue = form.value
      this.spinner(true);
      stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.card,
            billing_details : {
              address : {
                line1 : formValue.address,
                country: formValue.cc_country,
                state : formValue.cc_state,
                city : formValue.cc_city,
                postal_code : formValue.cc_zipcode,
              },
              email: this.donationData.donerType == 'guest'? this.donationData.guest.email || '' : this.email || "",
              name : formValue.cc_holder_name
            }
          }
        })
        .then((result)=>{
          this.spinner(false);
          if (result.error) {
            // Show error to your customer
            console.log(result.error);
            this.onError(result.error);
          } else {
            // The payment succeeded!
            this.onSuccess(result.paymentIntent.id);
          }
        });
  }

  onSuccess(paymentIntent) {
      this.donationData.paymentIntent= paymentIntent;
      this.load();
      this.spinner(true);
      //tell server payment is complete.

      const formData = new FormData();
      let temp_photo = null; 
      if(this.donationData.donerType== 'guest'){
       temp_photo = this.donationData.guest.photo;
       sessionStorage.setItem('photo', JSON.stringify(this.donationData.guest?.photo))
       delete this.donationData.guest.photo
      }else
      {
        temp_photo = this.donationData.regular.photo;
        sessionStorage.setItem('photo', JSON.stringify(this.donationData?.regular?.photo))
        delete this.donationData.regular.photo
      }
      formData.append('photo', temp_photo);
      console.log(this.donationData);
      formData.append('data', JSON.stringify(this.donationData));

      this.ds.complete_donation(formData, this.donationData.donerType).pipe(takeUntil(this.unsub$)).subscribe((events)=>{
        if(events.type == HttpEventType.UploadProgress) {
          this.loader.load(Math.round(100 * events.loaded / events.total));
        } else if(events instanceof HttpResponse) {
        this.stopload();
        this.spinner(false);
        const response = events.body;
        if(response.status){
          //const actualAmount = this.donationData.amount - (this.donationData.amount * this.donationData.tip /100);
          // alert('Thank you for donating, you donated $'+ this.donationData.amount + ' with a tip of $' + this.donationData.tip);
          // this.router.navigate(['/ads/view']);
          const tipAmount = (this.donationData.amount * this.donationData.tip/100);
          console.log(tipAmount)
          console.log(this.donationData.tip/100);
          this.router.navigate(['/payment-status'], {queryParams: {type: 'donation', success: true, paymentIntentId: paymentIntent, transactionId: response.data.donationId ,receiverName: this.adData.firstName || this.adData.agencyTitle || this.adData.sponsorTitle, adId: this.adData._id, amount: (this.donationData.amount - tipAmount), tip: tipAmount, date: new Date()}});
        } else {
          console.log(response);
          this.restore_pic();
          // alert(response.message);
          const tipAmount = (this.donationData.amount * this.donationData.tip/100);
          this.router.navigate(['/payment-status'], {queryParams: {type: 'donation', success: false, paymentIntentId: paymentIntent, receiverName: this.adData.firstName || this.adData.agencyTitle || this.adData.sponsorTitle, adId: this.adData._id, amount: (this.donationData.amount - tipAmount), tip: tipAmount, date: new Date(), error: response.message}});
        }
      }
    },  (error)=>{
      if(error.error instanceof ErrorEvent){
        console.log(error);
        error = "Unknown client side error occured";
      }
      else {
        error = error.error.message
      }
      this.restore_pic()
      this.spinner(false);
      this.stopload();
      const tipAmount = (this.donationData.amount * this.donationData.tip/100);
      this.router.navigate(['/payment-status'], {queryParams: {type: 'donation', success: false, paymentIntentId: paymentIntent, receiverName: this.adData.firstName || this.adData.agencyTitle || this.adData.sponsorTitle, adId: this.adData._id, amount: (this.donationData.amount - tipAmount), tip: tipAmount, date: new Date(), error: error}})
    })
  }

  restore_pic() {
    if(this.donationData.donerType== 'guest'){
      this.donationData.guest.photo = JSON.parse(sessionStorage.getItem('photo'))
     }else
     {
        this.donationData.guest.photo = JSON.parse( sessionStorage.getItem('photo'))
     }
  }

  onError(error) {
     if (error.message) {
        this.cardError = error.message;
     }
     this.spinner(false);
  }

  getPaymentIntent(amount: number){
    this.spinner(true);
    this.ds.get_payment_intent(this.adData._id, amount).pipe(takeUntil(this.unsub$)).subscribe((response : any)=>{
      this.spinner(false);
      if(response.status){
        this.clientSecret = response.data.clientSecret;
      } else {
        console.log(response);
        this.onError(response.message);
      }
    }, (error)=>{
      if(error.error instanceof ErrorEvent)
        alert('sorry couldn\'t connect to the server');
      else 
       alert(error.error.message);
      this.spinner(false);
      this.router.navigate(['/ads/view']);
    });
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
 
  getStates(event) {
    this.selectedCountryCode = event.target.value;
    this.ds.getGlobalStates(this.selectedCountryCode).subscribe((response)=>{
      if(response.status) {
        this.states = response.data;
      }
    })
  }

  getCities(event) {
    this.ds.getGlobalCities(this.selectedCountryCode, event.target.value ).subscribe((response)=>{
      if(response.status) {
        this.cities = response.data;
      }
    })
  }
}
