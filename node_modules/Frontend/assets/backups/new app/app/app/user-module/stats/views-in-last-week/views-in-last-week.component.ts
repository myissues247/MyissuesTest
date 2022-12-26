import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-views-in-last-week',
  templateUrl: './views-in-last-week.component.html',
  styleUrls: ['./views-in-last-week.component.css']
})
export class ViewsInLastWeekComponent  {
  viewDetail
  highestViews;
  heighestBumps;
  heighestDonations;
  totalViews;
  totalDonations;
  totalBumps;
  adId;
  imagepath = environment.server;
  imagePath;
  categoryName;
  adTitle;
  views;
  constructor(private route: ActivatedRoute, private ds: UserDataService) {
    this.adId = this.route.snapshot.paramMap.get('id');

    this.ds.get_Stats_For_Last_Week({ adId: this.adId }).subscribe(async (response) => {
      if (response.status) {
        this.viewDetail = response.data.AdData;
        this.views =  response.data.stats;
        console.log(this.views);

        //fill ad details for header
        this.imagePath = this.viewDetail.identityImages[0];
        this.categoryName = this.viewDetail.categoryName;
        this.adTitle = this.viewDetail.adTitle;
        this.totalViews = response.data.stats[0]? response.data.stats[0].viewsCount : 0;
        this.totalBumps = response.data.stats[0]? response.data.stats[0].totalBumps : 0;
        this.totalDonations = response.data.stats[0]? response.data.stats[0].totalDonations : 0;
        
        this.highestViews = Math.max.apply(Math, this.views.map((val) => { return val.views.viewCount || 0 }))
        this.heighestBumps = Math.max.apply(Math, this.views.map((val)=>{console.log(val);return val.views.bump || 0 }));
        this.heighestDonations = Math.max.apply(Math, this.views.map((val)=>{return val.views.donation || 0}))
        this.heighestDonations = Number(this.heighestDonations.toFixed(0))

        //start and end of week 
        const startDate = new Date(response.data.startDate);
        const endDate = new Date(response.data.endDate);
        let currentDate = startDate;
        const DayContainers = [] //container to fill days with empty views.

        //filling DayContainer with empty views if it's not present in views array
        for(let i = startDate.getDay(); i <= endDate.getDay(); i++) {
          const checkViews = this.views.find((x)=> new Date(x.views.dateISO).getDay() == i);

          let dayViewObj = null;
          if(checkViews)
             dayViewObj = checkViews;
          else {
             const datenow = new Date(currentDate);
             dayViewObj ={views: {viewCount: 0, bump: 0, donation: 0, dateISO: datenow.setDate(datenow.getDate() + i)}};}
  
          DayContainers.push(dayViewObj);
        }
        this.views = DayContainers; //after adding days filler for empty or not available days in original views.
        console.log(this.views);
 
      }else{
          this.ds.newMessage('error', 'Unable To Generate', 'Sorry failed to generate report')
      }
    }, (error)=>{
        if(error instanceof ErrorEvent)
           this.ds.newMessage('error', 'Error Occured','sorry some unknown error occured');
        else 
           this.ds.newMessage('error', 'Error Occured', `${error.error.message}`)
    })
  }

}
