import { Component, OnDestroy, OnInit ,ViewEncapsulation } from '@angular/core';
import { Ad } from '../../services/dataModels';
import { MenuItem } from 'primeng/api';
import {MessageService} from 'primeng/api';
import { AdPostService } from '../../services/ad-post.service';
import { Router } from '@angular/router';

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
  constructor(private ms : MessageService, private ps: AdPostService, private router: Router) { 
        this.items = [{
            label: 'Category',
            routerLink: 'select-category'
        },
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
          label: 'Contact',
          routerLink : 'user-details'
        },
        { 
          label: 'Upgrades',
          routerLink : 'upgrades'
        },
        {
          label:'Finalize',
          routerLink:'finalize'
        }
      ];
  }

  ngOnInit(): void {
    this.ps.lock = false;
     this.ps.messageObserver().subscribe((response)=>{
       this.ms.add(response);
     })
  }
  
  new_ad(newAd : Ad){
    this.currentAd = newAd;
  }

  seePreview(){
    this.ps.lock = true;
    this.ps.AdObservable().subscribe((ad: Ad)=>{
     if(ad._id)
       return this.router.navigate(['/ads/full'], {queryParams : {mode: "preview"}});
     this.ps.newMessage('info', 'Ad Not Initialized', 'Please initialize the ad first by selecting a category');
    });
  }

  ngOnDestroy(): any{
    this.ps.NewAdData(null);
  }
}
