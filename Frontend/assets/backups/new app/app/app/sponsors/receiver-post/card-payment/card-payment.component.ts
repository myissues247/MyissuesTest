import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/services/dataModels';
import { UserDataService } from 'src/app/services/user-data.service';
import { SponsorAdService } from '../../services/sponsor-ad.service';

@Component({
  selector: 'app-card-payment',
  templateUrl: './card-payment.component.html',
  styleUrls: ['./card-payment.component.css']
})
export class CardPaymentComponent implements OnInit {
  action : string;
 // paymentIntent: string;
  plan : any;
  ad : Ad;
  chargeToken: String
  @ViewChild('cardInfo') cardInfo: ElementRef; 
  card: any;
  clientSecret: string;
  cardHandler = this.onChange.bind(this);
  cardError: string; 
  country: string;
  zipCode : string;
  name  : string;
  address : string;

  constructor(private cd: ChangeDetectorRef,private ds: UserDataService, private ps: SponsorAdService, private router: Router) { }

  ngOnInit(): void {
      //check for ad details.
    this.ps.AdObservable().subscribe((ad)=>{
      this.ad = ad;
      if(!this.ad._id) {
        alert('no ad choosen');
        //bacc.
      }
    });
    
      //check for any plan added.
    this.ps.adPlanTakenObservable().subscribe((plan)=>{
      this.plan = plan;
      console.log(plan);
      if(this.plan.planId && this.plan._id) {
          //if the ad is published and new plan is taken then we have to upgrade plan and not publish the ad.
        if(this.ad.adState == 'published') {
          this.action = 'upgrade';
        }
      }
    });

    this.getPaymentIntent();
  }

  getPaymentIntent() {
    this.ps.get_payment_intent(this.plan.planId, this.plan._id).subscribe((response)=>{
      if(response.status) {
        console.log(response.data);
        this.clientSecret = response.data.clientSecret;
      } else {
        console.log(response);
        this.clientSecret = "";
        this.ps.newMessage('error', 'Payment Not Initialized', 'Couldn\'t initialize the payment');
      }
    }, (error)=>{
      if(error instanceof ErrorEvent) alert('sorry some unknown error occured');
      else alert(error.status + " : " + error.error.message);
    });
  }


  ngOnDestroy() {
      if (this.card) {
          // We remove event listener here to keep memory clean
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
      }
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
    if(form.form.status == "INVALID") {
      return this.ds.newMessage('error', 'Incorrect Form', 'Please fill the form correctly');
    }
    const formValue = form.value;
    console.log(form.value);
      stripe
        .confirmCardPayment(this.clientSecret, {
          payment_method: {
            card: this.card,
            billing_details : {
              address : {
                line1 : formValue.address,
                country: formValue.cc_country,
                postal_code : formValue.cc_zipcode
              },
              name : formValue.cc_holder_name
            }
          }
        })
        .then((result)=>{
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
      //save the data or publish the data.
    if(this.action == 'upgrade') {
      this.handlePlanUpgrade(paymentIntent);
    } else {
      this.handlePublish(paymentIntent);
    }
  }

  handlePlanUpgrade(paymentIntent) {
      //when editing an already published ad we just upgrade the plan and not publish
    const data = {
                adId : this.ad._id,
                planId : this.plan.planId,
                categoryId: this.plan._id,
                paymentIntent  
              }
    this.ps.upgrade_plan(data).subscribe((response)=>{
      if(response.status) {
        alert('plan was upgraded');
      } else {
        console.log(response);
        alert('sorry some error occurd');
      }
    }, this.errorHandle.bind(this));
  }

  handlePublish(paymentIntent) {
      //if the plan is not yet published that means it needs to be published and the plan is already saved to server in upgrade component.
    const data = {
                  adId : this.ad._id,
                  planId : this.plan.planId,
                  categoryId: this.plan._id,
                  paymentIntent
             }
    console.log(data);
    this.ps.publish_plan(data).subscribe((response)=>{
      if(response.status) {
        console.log(response);
        alert(response.message);
        this.router.navigate(['/sponsor']);
      } else {
        console.log(response);
        alert(response);
      }
    }, this.errorHandle.bind(this));  
  }

  onError(error) {
     if (error.message) {
        this.cardError = error.message;
     }
  }

  errorHandle(error) {
    if(error instanceof ErrorEvent)
      this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
    else 
      this.ps.newMessage('error', 'Error Occured', error.status + ":" + error.error.message);
  }

}
