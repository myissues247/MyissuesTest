import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
token;
verifySuccess;
verifyFail;
  constructor(private route:ActivatedRoute,private ds:UserDataService) { }

  async ngOnInit() {
     await  this.route.queryParamMap.subscribe(async (d)=>{
        this.token=await d.get('token');
      })
      this.ds.mailVerificaton({token:this.token}).subscribe(async (response)=>{
        if(response.status){
          this.verifySuccess=true;
          this.verifyFail=false;
        }
        else {
          this.verifyFail=true;
          this.verifySuccess=false;
        }
      })
  }

}
