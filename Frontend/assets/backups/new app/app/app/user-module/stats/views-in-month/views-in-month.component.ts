import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-views-in-month',
  templateUrl: './views-in-month.component.html',
  styleUrls: ['./views-in-month.component.css']
})
export class ViewsInMonthComponent {
  viewDetail
  highestViews;
  heighestBumps;
  heighestDonations
  year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  totalViews;
  totalDonations;
  totalBumps;
  adId;
  imagepath = environment.server;
  imagePath;
  categoryName;
  adTitle;
  views: any[];
  constructor(private ds: UserDataService, private route: ActivatedRoute) {
    this.adId = this.route.snapshot.paramMap.get('id');
    // alert(adId)
    this.ds.get_Stats_For_Year({ adId:this.adId }).subscribe(async (response) => {
      if(response.status) {
        this.viewDetail = await response.data.AdData;
        this.views=await response.data.stats     
        console.log(this.views);

        //filling ad details
        this.imagePath=this.viewDetail.identityImages[0];
        this.categoryName=this.viewDetail.categoryName;
        this.adTitle=this.viewDetail.adTitle;
        this.totalViews=this.views && this.views[0]? this.views[0].viewsCount : 0;
        this.totalBumps = this.views && this.views[0]? this.views[0].totalBumps : 0;
        this.totalDonations = this.views && this.views[0]? this.views[0].totalDonations : 0;
        this.highestViews=Math.max.apply(Math, this.views.map((val)=>{return val.views || 0;}));
        this.heighestBumps=Math.max.apply(Math, this.views.map((val)=>{return val.bumps || 0;}));
        this.heighestDonations=Math.max.apply(Math, this.views.map((val)=>{return val.donations || 0;}));

        //using fillers to fill empty months.
        const MonthContainer = [];
        for(let i=1; i<= 12; i++) {
          const checkMonthPresence = this.views.find((month)=>month._id.month == i);
          let newMonthToBePushed = null;
          if(checkMonthPresence)
            newMonthToBePushed = checkMonthPresence;
          else
            newMonthToBePushed = {_id: {month: i}, bumps: 0, donations: 0,  views: 0} //filler;

          MonthContainer.push(newMonthToBePushed);
            
        }
        this.views = MonthContainer; //new monthly views with filler months.
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

  // async ngOnInit() {

  // }

}
