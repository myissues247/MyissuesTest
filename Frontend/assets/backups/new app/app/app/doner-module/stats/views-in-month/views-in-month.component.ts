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
  heighestDonations
  year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  totalDonations;
  donations: any[];
  constructor(private ds: UserDataService, private route: ActivatedRoute) {
    // alert(adId)
    this.ds.get_Donation_Stats_For_Year({}).subscribe(async (response) => {
      if(response.status) {
        this.viewDetail = await response.data.AdData;
        this.donations=await response.data.stats     
        console.log(this.donations);

        this.totalDonations = this.donations && this.donations[0]? this.donations[0].totalDonations : 0;
        this.heighestDonations=Math.max.apply(Math, this.donations.map((val)=>{return val.donations || 0;}));

        //using fillers to fill empty months.
        const MonthContainer = [];
        for(let i=1; i<= 12; i++) {
          const checkMonthPresence = this.donations.find((month)=>month._id.month == i);
          let newMonthToBePushed = null;
          if(checkMonthPresence)
            newMonthToBePushed = checkMonthPresence;
          else
            newMonthToBePushed = {_id: {month: i}, bumps: 0, donations: 0} //filler;

          MonthContainer.push(newMonthToBePushed);
            
        }
        this.donations = MonthContainer; //new monthly donations with filler months.
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
