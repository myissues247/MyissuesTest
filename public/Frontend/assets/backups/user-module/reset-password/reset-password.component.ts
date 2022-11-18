import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
token;
newPassword;
confirmPassword;
loading;
type;
error;
success
  constructor(private route:ActivatedRoute,private ds:UserDataService,private router:Router) { }

  async ngOnInit(){

    await this.route.queryParamMap.subscribe(async (d)=>{
        this.token=await d.get('token');
        this.type = await d.get('type');
    })
  }

  resetPassword(){

    if(Boolean(this.newPassword)==false) return this.error ='Please Enter New Password';
    if(!this.newPassword.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})'))
      return this.error ='Please select a strong password';
    if(Boolean(this.confirmPassword)==false) 
      return this.error ='Please Enter Confirm Password';
    if(this.newPassword != this.confirmPassword) 
      return this.error ='Both Password Are Not Matched';

    this.error ='';
    setTimeout(() => {
      this.loading=true;
      this.ds.resetPasswordLink({token:this.token,newPassword:this.newPassword, type:this.type}).subscribe(async (response)=>{
        if(response.status){
          this.loading=false;
          this.success =response.message;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
         
        }else{
          this.loading=false;
          document.getElementById('err').textContent=response.message;
        }  
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        document.getElementById('err').textContent= "Sorry some unknown error occured on the browser";
      else 
        document.getElementById('err').textContent = error.error.message;
    })
    }, 100);
  

  }

}
