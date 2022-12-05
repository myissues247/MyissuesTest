import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-views-in-last-week',
  templateUrl: './views-in-last-week.component.html',
  styleUrls: ['./views-in-last-week.component.css']
})
export class ViewsInLastWeekComponent {
  viewDetail
  highestViews;
  totalViews
  adId;
  imagepath = 'http://18.223.136.68';
  imagePath;
  categoryName;
  adTitle;
  views;
  constructor(private route: ActivatedRoute, private ds: UserDataService) {
    this.adId = this.route.snapshot.paramMap.get('id');
    // alert(adId)
    this.ds.get_Stats_For_Last_Week({ adId: this.adId }).subscribe(async (response) => {
      if (response.status) {
        this.viewDetail = response.data.AdData;
        console.log(this.viewDetail);
       
        this.views = await response.data.stats;
        this.views.sort(function (a, b) {
          return a.views.dateISO.localeCompare(b.views.dateISO);
        })
        console.log(this.views);
        
        this.imagePath = this.viewDetail.identityImages;
        this.categoryName = this.viewDetail.categoryName;
        this.adTitle = this.viewDetail.adTitle;
        this.totalViews = this.views[0] ? this.views[0].viewsCount :0;
        this.highestViews = Math.max.apply(Math, this.views.map((val) => { return val.views.viewCount; }))
        
        
      } else {
        console.log(response.message);

      }
    })
  }

}
