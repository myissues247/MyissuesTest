import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-views-in-this-week',
  templateUrl: './views-in-this-week.component.html',
  styleUrls: ['./views-in-this-week.component.css']
})
export class ViewsInThisWeekComponent  {
  viewDetail
  heighestDonations;
  totalDonations;
  adTitle;
  donations:any[];
  constructor(private route:ActivatedRoute,private ds:UserDataService) { 
    this.ds.get_Donation_Stats_For_This_Week({}).subscribe(async (response) => {
      if(response.status){
        this.viewDetail = response.data.AdData;
        this.donations =  response.data.stats;
        console.log(this.donations);

        this.totalDonations = response.data.stats[0]? response.data.stats[0].totalDonations : 0;
        
        this.heighestDonations = Math.max.apply(Math, this.donations.map((val)=>{return val.donations.donation || 0}))
        this.heighestDonations = Number(this.heighestDonations.toFixed(0))

        //start and end of week 
        const startDate = new Date(response.data.startDate);
        console.log(startDate);
        const endDate = new Date(response.data.endDate);
        console.log(endDate);
        let currentDate = startDate;
        const DayContainers = [] //container to fill days with empty views.

        //filling DayContainer with empty views if it's not present in views array
        for(let i = startDate.getDay(); i <= endDate.getDay(); i++) {
          console.log(i);
          const checkViews = this.donations.find((x)=> new Date(x.donations.dateISO).getDay() == i);
          console.log(checkViews);
          console.log('heelo ' + i);

          let dayViewObj = null;
          if(checkViews)
             dayViewObj = checkViews;
          else {
             const datenow = new Date(currentDate);
             dayViewObj ={donations: {donation: 0, dateISO: datenow.setDate(currentDate.getDate() + i)}};}
  
          DayContainers.push(dayViewObj);            
        }
        this.donations = DayContainers; //after adding days filler for empty or not available days in original views.
        console.log(this.donations);
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
