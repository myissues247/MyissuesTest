import { Component, OnDestroy, OnInit ,ViewEncapsulation } from '@angular/core';
import { Ad } from '../../services/dataModels';
import { MenuItem } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { SponsorAdService } from '../services/sponsor-ad.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-receiver-post',
  templateUrl: './receiver-post.component.html',
  styleUrls: ['./receiver-post.component.scss'],
 // encapsulation: ViewEncapsulation.None,
  providers: [MessageService] 
})
export class ReceiverPostComponent implements OnInit, OnDestroy {
  currentAd : Ad;
  items: MenuItem[];
  activeIndex: number = 1;
  currentPage = 2;
  unsub$ = new Subject();
  constructor(private ms : MessageService, private ps: SponsorAdService, private router: Router) { 
        this.items = [
        //   {
        //     label: 'Category',
        //     routerLink: 'select-category'
        // },
        {
            label: 'Location',
            routerLink: 'select-location' 
        },
        { 
            label: 'Content',
            routerLink: 'ad-content'
        },
        {
            label: 'Images',
            routerLink: 'upload-images'
        },
        { 
          label: 'contact',
          routerLink : 'user-details'
        },
        { 
          label: 'Upgrades',
          routerLink : 'upgrades'
        },
        {
          label:'finalize',
          routerLink:'finalize'
        }
      ];
  }

  ngOnInit(): void {
    this.ps.lock = false;
     this.ps.messageObserver().pipe(takeUntil(this.unsub$)).subscribe((response)=>{
       this.ms.add(response);
     })

     this.ps.page$.asObservable().pipe(takeUntil(this.unsub$)).subscribe((number: number)=>{
      this.currentPage = number
      console.log(number);
   })
  }
  
  new_ad(newAd : Ad){
    this.currentAd = newAd;
  }

  seePreview(){
    this.ps.lock = true;
    this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
     if(ad._id)
       return this.router.navigate(['/ads/full'], {queryParams : {mode: "preview"}});
     this.ps.newMessage('info', 'Ad Not Initialized', 'Please initialize the ad first by selecting a category');
    });
  }
  ngOnDestroy(): any{
    this.ps.NewAdData(null);
    this.unsub$.next();
    this.unsub$.complete();
  }
}
