import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  mailProp;
  passwordProp;
  username=false;
  pass=false;
  error;
  constructor(private ds:UserDataService, private ss: StateService , private router:Router) { }

  ngOnInit(): void {
  }

  SignIn(){
    if(Boolean(this.mailProp)==false){
        this.username=true;
        return true;
    }else
    this.username=false;

    if(Boolean(this.passwordProp)==false){
      this.pass=true;
      return true;
    }else
    this.pass=false;

      this.ds.GetUser({email:this.mailProp,password:this.passwordProp}).subscribe(async (response)=>{
        if(response.status==true){
         
          document.getElementById('err').innerHTML='';
          console.log(response.data);
          this.ss.setUserSession(response.data);
          document.getElementById('close').click();
          setTimeout(() => {
            if(response.data.type=="receiver")
            return this.router.navigate(['/user'])
            else if(response.data.type=="doner")
            return this.router.navigate(['/category'])
          
          }, 1000);
         
           
        }
      }
      ,(err)=>{
        console.log(err.error.message)
        this.error=true;
        document.getElementById('err').innerHTML=err.error.message;
      })
  }

}
