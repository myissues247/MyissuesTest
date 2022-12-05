import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Bumps } from 'src/app/services/dataModels';
import { SponsorDataService } from '../../services/sponsor-data.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-purchase-bumps',
  templateUrl: './purchase-bumps.component.html',
  styleUrls: ['./purchase-bumps.component.css']
})
export class PurchaseBumpsComponent implements OnInit, OnDestroy {
  @ViewChild('paymentOption') 
    paymentOptionModal;
  @ViewChild('optionClose')
    closeModal;
  @ViewChild('paymentStatus')
    paymentStatusModalOpener;

  bumps : Bumps; 
  selectedBump : any;
  balance;
  showConfirm; //confirm balance payment;
  unsub$ = new Subject();
  
  transactionDetails : any = {};
  constructor(private ps :SponsorDataService, private router : Router, private ss: StateService, private ds: UserDataService) { }

  ngOnInit(): void {
    this.getAdPlan();
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      this.balance = session.balance
    });
  }

  getAdPlan(){
    // get ad and bump plans from server.
    this.ps.get_bumps().subscribe((response)=>{
      if(response.status){
        this.bumps = response.data;
        console.log(response.data);
      } else {
        console.log(response);
        alert(response.message);
      }
    }, this.handle_error.bind(this))
  }

 
  handle_error(error) {
    // handle observable errors
    if(error instanceof ErrorEvent)
      this.ds.newMessage('error', 'Error Occured', 'sorry some error occured on the client side');
    else 
      this.ds.newMessage('error', 'Failed', `${error.error.message}`);
  }

  showPaymentOptions(bump) {
    this.selectedBump = bump;
    this.paymentOptionModal.nativeElement.click()
  }
  
  buyBumps() {
    const bump = this.selectedBump;
    this.router.navigate(['/sponsor/bumps/pay-with-card'], {queryParams: {bumpId: bump._id, price: bump.price, count: bump.count}})
  }

  buyBumpWithBalance() {
    const selectedBumpLocal = this.selectedBump;
    this.ps.purchase_bump_up_with_bal({bumpId: this.selectedBump._id}).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
       if(response.status) {
        //  alert('Purchased ' + this.selectedBump.count + " bumps");
         this.ss.bumpsAdd(response.data.totalBumps);
         this.transactionDetails = {
           transactionId : response.data.transactionId,
           count : selectedBumpLocal.count,
           price : selectedBumpLocal.price,
           date : new Date()
         }
         this.paymentStatusModalOpener.nativeElement.click();
        //  history.back();
       } else {
         this.ds.newMessage('error', 'Failed', response.message);
       }
    }, this.handle_error.bind(this));
  }

  close_modal() : void {
    this.closeModal.nativeElement.click();
    this.showConfirm = false;
    this.selectedBump = null;
  }

  closePStatus() : void {
    history.back();
  }
  
  ngOnDestroy() : void {
    this.closeModal.nativeElement.click()
    this.unsub$.next();
    this.unsub$.complete();
  }

}
