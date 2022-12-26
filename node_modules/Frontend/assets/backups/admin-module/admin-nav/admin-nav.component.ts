import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AdminDataService } from 'src/app/services/admin-data.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  displaysidebar;
  items: MenuItem[];
  constructor(private ds:AdminDataService,private router:Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Dashboard',
        icon: 'pi pi-pw pi-chart-bar',
        routerLink:'/admin-module'
      },
      {
        label: 'Site',
        icon: 'pi pi-pw pi-cog',
        items: [{
          label: 'Banner Setup',
          icon: 'pi pi-fw pi-flag',
          routerLink:'banner'
        },
        { label: 'Site Setup', icon: 'pi pi-fw pi-globe', routerLink:'site' },
        // { label: 'Slider Setup', icon: 'pi pi-fw pi-images'},
        { separator: true },
        ]
      },
      {
        label: 'User',
        icon: 'pi pi-pw pi-user',
        items: [
          { label: 'Donner', icon: 'pi pi-fw pi-thumbs-up' ,
          items: [
            { label: 'Doner Setup', icon: 'pi pi-fw pi-user',routerLink:'donner'},
            { label: 'Donated House', icon: 'pi pi-fw pi-home' },
            { label: 'Donations', icon: 'pi pi-fw pi-dollar', routerLink: 'donations'}
          ]
        },
        { label: 'Receiver', icon: 'pi pi-fw pi-user', items: [
          {label: 'Manage', icon: 'pi pi-fw pi-user', routerLink:'receiver-ads'},
          {label: 'Ads', icon: 'pi pi-fw pi-user', routerLink: 'receiver-ads/ads'}
        ] },
          { label: 'Sponsors', icon: 'pi pi-fw pi-users',routerLink:'sponsor' },
          { label: 'Agency', icon: 'pi pi-fw pi-sitemap' ,
            items: [
              { label: 'Agency', icon: 'pi pi-fw pi-sitemap', routerLink:'agency'},
              { label: 'Agency Category', icon: 'pi pi-fw pi-map',routerLink:'agency-category' },
              { label: 'Ads', icon: 'pi pi-fw pi-user', routerLink: 'agency/ads'}
            ]
          }
        ]
      },
      {
        label: 'Payment',
        icon: 'pi pi-pw pi-money-bill',
        items: [
          { label: 'Transaction History', icon: 'pi pi-fw pi-paypal', routerLink: 'transactions'},
          { label: 'Withdraw Request', icon: 'pi pi-fw pi-money-bill', routerLink:'withdraw'}
        ]

      },
      {
        label: 'Location',
        icon: 'pi pi-pw pi-map-marker',
        items: [
          { label: 'Province', icon: 'pi pi-fw pi-sitemap', routerLink:'province' },
          { label: 'Region', icon: 'pi pi-fw pi-map',routerLink:'region' },
          { label: 'City', icon: 'pi pi-fw pi-map-marker',routerLink:'city' }
        ]
      },
      {
        label: 'Advertise',
        icon: 'pi pi-pw pi-briefcase',
        items: [
          // { label: 'Advertising', icon: 'pi pi-fw pi-briefcase'},
          { label: 'Subscription', icon: 'pi pi-fw pi-bell'},
          { label: 'Bump Up', icon: 'pi pi-fw pi-map' ,routerLink:'bump'

        //    items: [
        //     { label: 'Bump-up', icon: 'pi pi-fw pi-sitemap',routerLink:'bump'},
        //     { label: 'Hours Bump-up', icon: 'pi pi-fw pi-calendar-times' ,routerLink:'bump-hour'}
        //  ]

         }
        ]
      },
      {
        label: 'Additional Setting',
        icon: 'pi pi-pw pi-cog',
        items: [
          { label: 'Volunteer', icon: 'pi pi-fw pi-user-plus',routerLink:'volunteer'},
          { label: 'Category', icon: 'pi pi-fw pi-plus', routerLink:'category' },
          // { label: 'Discussion', icon: 'pi pi-fw pi-comment' },
          { label: 'Queries', icon: 'pi pi-fw pi-comments', routerLink: "queries" }
        ]

      },
      {
        label: 'Admin Setting',
        icon: 'pi pi-pw pi-cog',
        items: [
          { label: 'password', icon: 'pi pi-fw pi-lock', routerLink:'setting'}
        ]
      },
      {
        label: 'Log Out',
        icon: 'pi pi-pw pi-sign-out',
        command:()=>{
          this.ds.logout({}).subscribe(async (response)=>{
            if(response.status){
                  this.router.navigate(['/']);
            }else{
                console.log(response.message);
                
            }
          })
        }

      },

    ];



  }
  display(){
    if(Boolean(this.displaysidebar)){
      this.displaysidebar=false;
    }else{
      this.displaysidebar=true;
    }

  }

}
