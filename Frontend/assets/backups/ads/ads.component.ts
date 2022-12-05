import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../services/user-data.service';
import { Ad } from '../../services/dataModels';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  ads : Ad[];
  constructor(private ds: UserDataService) { }

  ngOnInit(): void {
  }
}
