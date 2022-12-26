import { Component, OnInit } from '@angular/core';
import { AdminDataService } from 'src/app/services/admin-data.service';
import {MessageService} from 'primeng/api';

interface Stats {
  receivers: number,
  donors: number,
  ads: number, 
  donations: number,
  reports: number,
  querier: number
}


@Component({
  selector: 'app-dashboard-stats',
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.css'],
  providers: [MessageService]
})
export class DashboardStatsComponent implements OnInit {
  stats
  constructor(private ds: AdminDataService, private ms: MessageService) { }

  ngOnInit(): void {
    this.getStats();
  }

  getStats() {
    if(sessionStorage.getItem('stats')) {
      this.stats = JSON.parse(sessionStorage.getItem('stats'));
      return
    }
    this.ds.getDashboard().subscribe((response)=>{
      if(response.status) {
        this.stats = response.data;
      } else {
        this.ms.add({ severity: "error", summary: "Stats Not Fetched", detail: "There is some problem in fetching stats"});
      }
    },(error)=>{
      if(error instanceof ErrorEvent) 
         this.ms.add({severity: "error", summary: "Error" , detail: "Sorry some error occured on the client"});
      else 
         this.ms.add({severity: "error", summary: "Faild", detail: error.error.message});
    })
  }
 
}
