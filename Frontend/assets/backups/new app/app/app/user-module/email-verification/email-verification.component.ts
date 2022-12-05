import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {
  email;
  type;
  message;
  success;
  submitting = false;
  constructor(private ds: UserDataService, private ar : ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.ar.queryParams.subscribe((params)=>{
      if(params.email){
        this.success = params.success,
        this.email = params.email;
        this.type = params.type;
      }
      else 
        this.router.navigate(['/']);
    })
  }

  resend() {
    this.submitting = true;
    this.ds.resendVerification({email: this.email, type: this.type}).subscribe((response)=>{
      this.message = response.message;
      this.submitting = false;
    }, (error)=>{
      this.submitting = false;
       if(error.error instanceof ErrorEvent) {
         this.message = "Sorry some unknown client side error occured " + error.error;
       } else {
         this.message = error.error.message;
       }
    })
  }

}
