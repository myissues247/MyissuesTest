import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-views-in-month',
  templateUrl: './views-in-month.component.html',
  styleUrls: ['./views-in-month.component.css']
})
export class ViewsInMonthComponent {
  viewDetail
  highestViews;
  year = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  totalViews
  constructor(private ds: UserDataService, private route: ActivatedRoute) {
    let adId = this.route.snapshot.paramMap.get('id');
    // alert(adId)
    this.ds.get_Stats_For_Year({ adId }).subscribe(async (response) => {
      console.log(response);
      this.viewDetail = response;
      this.totalViews=this.viewDetail.reduce((curr,prev)=>
       curr+prev.views,0
        
      )
      this.highestViews=Math.max.apply(Math,this.viewDetail.map((val)=>{return val.views;}))
      console.log(this.highestViews);
      
      console.log(this.totalViews);
      
    })
  }

  // async ngOnInit() {

  // }

}
