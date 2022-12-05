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
  message;
  submitting;
    constructor(private route:ActivatedRoute,private ds:UserDataService) { }
  
    async ngOnInit() {
       await  this.route.queryParamMap.subscribe(async (d)=>{
          this.token=await d.get('token');
          this.type = await d.get('type');
          console.log(this.type);
        this.submitting = true;
        this.ds.mailVerificaton({token:this.token, type: this.type}).subscribe(async (response)=>{
          this.submitting = false;
          if(response.status){
            this.verifySuccess=true;
            this.verifyFail=false;
          }
          else {
            this.verifyFail=true;
            this.verifySuccess=false;
            this.message = response.message;
          }
        }, (error)=>{
          this.submitting = false;
          if(error.error instanceof ErrorEvent) {
            console.log(error.error);
            this.message = "Sorry some unknown client side error occured";
          } else {
            this.verifyFail=true;
            this.verifySuccess=false;
            this.message = error.error.message;
          }
        })
      })
    }

}
