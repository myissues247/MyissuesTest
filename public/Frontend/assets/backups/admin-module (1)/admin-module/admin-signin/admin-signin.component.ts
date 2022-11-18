import { Component, OnInit } from '@angular/core';
 import { AdminDataService } from 'src/app/services/admin-data.service';
 import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-admin-signin',
  templateUrl: './admin-signin.component.html',
  styleUrls: ['./admin-signin.component.css']
})
export class AdminSigninComponent implements OnInit {
mailProp;
passProp;
display=true;
  constructor(private ds:AdminDataService,private router:Router, private ss: StateService) { }

  ngOnInit(): void {
  }

  signin(){
      if(Boolean(this.mailProp) && Boolean(this.passProp)){
          this.ds.signin({email:this.mailProp,password:this.passProp}).subscribe((response)=>{
            if(response.status==true){
              console.log('hello');
              this.ss.logout();
              sessionStorage.removeItem('session');
              const session = {type: 'admin'};
              sessionStorage.setItem('admin', JSON.stringify(session));
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
