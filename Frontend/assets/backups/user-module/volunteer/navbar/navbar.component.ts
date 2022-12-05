import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  role=[];
  passwordProp;
  nameProp;
  mailProp;
  confProp;
  lastProp;
  name=false;
  mail=false;
  conf=false;
  pass=false;
  last=false;
  roleProp;
  ifrole=false;
  constructor(private ds:UserDataService,private router:Router) {
      this.role=[
            {name: 'receiver', code: 'Receiver'},
            {name: 'doner', code: 'Doner'},
            {name: 'sponsor', code: 'Sponsor'},
            {name: 'agency', code: 'Agency'}
      ]
   }

  ngOnInit(): void {
  }

  SignUp(){
    
    if(Boolean(this.nameProp)==false){
        this.name=true;
        return true
    }else
    this.name=false;

    if(Boolean(this.lastProp)==false){
        this.last=true;
        return true;
    }else
    this.last=false;

    if(Boolean(this.mailProp)==false){
          this.mail=true;
          return true;
    }else
    this.mail=false;

    if(Boolean(this.roleProp)==false){
      this.ifrole=true;
      return true;
    }else
    this.ifrole=false;

    if(Boolean(this.passwordProp)==false){
        this.pass=true;
        return true;
    }else
    this.pass=false;

    if(Boolean(this.confProp)==false){
        this.conf=true;
        return true;
    }else
    this.conf=false;
    
    if(this.passwordProp!=this.confProp)
    {
      alert('Both Password Does not Match')
      return true;
    }
   
    this.ds.AddUser({firstname:this.nameProp,lastname:this.lastProp,email:this.mailProp,password:this.passwordProp,userType:this.roleProp.name}).subscribe((response)=>{
        alert(response.message)
        this.nameProp=this.lastProp=this.mailProp=this.passwordProp=this.confProp=this.roleProp='';
        document.getElementById('close').click()

    },
    (err)=>{
      console.log(err)
    })


  }


}
