import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit {
token;
newPassword;
confirmPassword;
loading;
  constructor(private route:ActivatedRoute,private ds:UserDataService,private router:Router) { }

  async ngOnInit(){

    await this.route.queryParamMap.subscribe(async (d)=>{
        this.token=await d.get('token');
    })
  }

  resetPassword(){

    if(Boolean(this.newPassword)==false) return document.getElementById('err').textContent='Please Enter New Password';
    if(Boolean(this.confirmPassword)==false) return document.getElementById('err').textContent='Please Enter Confirm Password';
    if(this.newPassword != this.confirmPassword) return document.getElementById('err').textContent='Both Password Are Not Matched';

    document.getElementById('err').textContent='';
    setTimeout(() => {
      this.loading=true;
      this.ds.resetPasswordLink({token:this.token,newPassword:this.newPassword}).subscribe(async (response)=>{
        if(response.status){
          this.loading=false;
          document.getElementById('success').textContent=response.message;
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
         
        }else{
          this.loading=false;
          document.getElementById('err').textContent=response.message;
        }


        
    })
    }, 1000);
  

  }

}
