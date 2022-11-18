import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bumps } from 'src/app/services/dataModels';
import { StateService, UserSession } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card-pay',
  templateUrl: './card-pay.component.html',
  styleUrls: ['./card-pay.component.css']
})
export class CardPayComponent implements OnInit {
  loading = false;
  submitting =false;
  unsubscribe$; //unsub from all subs.
  paymentIntent : string;
  @ViewChild('cardInfo') cardInfo: ElementRef;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string; 
  bumpUpData : Bumps = null; 
  back : any = {
    link : "",
    params: {},
  }
  session : UserSession;

  selectedCountryCode;
  states = [];
  cities = [];
  constructor(private cd: ChangeDetectorRef, private ar: ActivatedRoute, private ds: UserDataService, private router: Router, private ss: StateService) {
    this.unsubscribe$ = new Subject();
   }

  ngOnInit(): void {
    this.get_bump_id_from_url();
    this.ss.getUserSessionObservable().subscribe((session)=>{
      this.session = session;
    })
  }
   
  get_bump_id_from_url() {
    //get bump data from url especially bumpId. then save if locally.
    this.ar.queryParams.pipe(takeUntil(this.unsubscribe$)).subscribe((data)=>{
      if(data.bumpId) {
        this.bumpUpData = {
          _id: data.bumpId,
          price : data.price,
          count : data.count 
        }
        if(data.back) {
          this.back.link = data.back;
          if(data.back == '/receiver-ad/upgrades') {
             if(data.adId)
               this.back.params.adId = data.adId;
          }
        } else {
            this.back.link = '/receiver';
        }
      }
    });
  }


  ngAfterViewInit() {
    this.initiateCardElement();
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
    //payment method token generation is completed and then as per result handler functions are called.
    if(form.form.status == "INVALID") {
      return this.ds.newMessage('error', 'Incorrect Form Details', "Please fill the form with valid details");
    }
    this.spinning();
    let formValue = form.value;
    stripe.createPaymentMethod({
            type: "card",
            card: this.card,
            billing_details : {
              address : {
                line1 : formValue.address,
                country: formValue.cc_country,
                state : formValue.cc_state,
                city : formValue.cc_city,
                postal_code : formValue.cc_zipcode
              },
              name : formValue.cc_holder_name
            }
    }).then((result)=>{
        if (result.error) {
          this.stopspinning()
          console.log(result.error);
          this.onError(result.error);
        } else {
          this.onSuccess(result.paymentMethod.id);
        }
    });
  }

  onSuccess(paymentMethodId) {
    //when paymentmethodid is generated.
    const data = {paymentMethodId, bumpId: this.bumpUpData._id}
    this.completeOrder(data);
  }

  completeOrder(data) {
    //submit to server then check response. if action is needed then 2FA is needed to be completed.
    this.spinning();
    this.ds.purchase_bump_up(data).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      this.stopspinning();
      if(response.status) {
        // alert(response.message);
        console.log(response.data);
        this.ss.bumpsAdd(response.data.totalBumps);
        
        // this.router.navigate([this.back.link], {queryParams: this.back.params});
        this.router.navigate(['/receiver/payment-status'], {queryParams: {type: 'purchase', success: true, paymentIntentId: response.data.paymentIntent, transactionId: response.data.transactionId, backLink: this.back.link, adId: this.back.params?.adId, amount: this.bumpUpData.price, bumps: this.bumpUpData.count, date: new Date()}});
      } else {
        if(response.code == 'action-needed') {
          this.secure_auth(response.data.paymentIntent);
        } 
      }
    }, this.handle_error.bind(this));
  } 

  secure_auth(paymentIntent) {
    this.spinning();
    //handles 2FA authentication when  completed the form is again submitted to server with paymentIntent instead of paymentMethod.
    stripe.handleCardAction(paymentIntent)
    .then((result)=>{
      this.stopspinning();
      if(result.error) {
        this.onError(result.error);
      } else  {
        console.log(result.id);
        this.submitPaymentIntent(result.paymentIntent.id);
        this.paymentIntent = result.paymentIntent.id;
      }
    })
  }

  submitPaymentIntent(intent) {
    //when 2FA has been completed, thus we can send the server payment intent id. to complete the order.
    const data = {paymentIntentId: intent, bumpId : this.bumpUpData._id}
    this.completeOrder(data);
  }

  onError(error) {
    // handle card error.
    if (error.message) {
       this.cardError = error.message;
    }
  }

  handle_error(error) {
    // handle observable errors
    if(error instanceof ErrorEvent)
      alert('sorry some error occured on the client side');
    else 
      alert(`${error.status} : ${error.error.message}`);
  }

  ngOnDestroy() {
    if (this.card) {
        // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  get_payment_intent(bumpId) {
    this.ds.get_payment_intent_for_bumpup(bumpId).pipe(takeUntil(this.unsubscribe$)).subscribe((response)=>{
      if(response.status){
        this.paymentIntent = response.data.clientSecret;
        this.bumpUpData = response.data.bumpUpData;
        console.log(response);
      }
      else  {
        alert(response.message);
        console.log(response);
      }
    }, (error) => {
      // handle observable errors
      if(error.error instanceof ErrorEvent)
        alert('sorry some error occured on the client side');
      else 
        alert(`${error.status} : ${error.error.message}`);
      history.back();
    })
  }

  spinning() {
    this.loading = true;
    this.submitting  = true;
  }

  stopspinning() {
    this.loading = false;
    this.submitting =false;
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