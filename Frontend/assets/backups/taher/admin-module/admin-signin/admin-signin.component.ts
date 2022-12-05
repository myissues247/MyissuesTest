import { Component, OnInit } from '@angular/core';
 import { AdminDataService } from 'src/app/services/admin-data.service';
 import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {
mailProp;
passProp;
display=true;
  constructor(private ds:AdminDataService,private router:Router) { }

  ngOnInit(): void {
  }

  signin(){
      if(Boolean(this.mailProp) && Boolean(this.passProp)){
          this.ds.signin({email:this.mailProp,password:this.passProp}).subscribe((response)=>{
            if(response.status==true){
              console.log('hello');
              this.router.navigate(['/admin-module']);
            } else {
              alert(response.message);
            }
          },
          (err)=>{
            alert(err.error.message)
          })

      }
  }

}
