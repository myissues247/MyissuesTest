import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  type;
  token;
  verifySuccess;
  verifyFail;
    constructor(private route:ActivatedRoute,private ds:UserDataService) { }
  
    async ngOnInit() {
       await  this.route.queryParamMap.subscribe(async (d)=>{
          this.token=await d.get('token');
          this.type = await d.get('type');
          console.log(this.type);
        this.ds.mailVerificaton({token:this.token, type: this.type}).subscribe(async (response)=>{
          if(response.status){
            this.verifySuccess=true;
            this.verifyFail=false;
          }
          else {
            this.verifyFail=true;
            this.verifySuccess=false;
          }
        })

      })
    }

}
