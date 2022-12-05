import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  sitefooter={
    location:null,
    contactNo:null,
    email:null
  };
  constructor(private ds:UserDataService) { }

  ngOnInit(): void {
    this.ds.GetLayout({}).subscribe((response)=>{

      this.sitefooter=response.data.footerInfo.settings;
      
    },(err)=>{console.log(err)})
  }


}
