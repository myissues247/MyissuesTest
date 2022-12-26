import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserdataService } from '../../userdata.service';

@Component({
  selector: 'app-neighbourinfo',
  templateUrl: './neighbourinfo.component.html',
  styleUrls: ['./neighbourinfo.component.css']
})
export class NeighbourinfoComponent implements OnInit {
neighbours1;
neighbours2;
  constructor(private router:Router,public Userdata:UserdataService, private ds: UserDataService ) { }

  ngOnInit(): void {
     this.neighbours1=this.Userdata.getUserInfo().neighbours1;
     this.neighbours2 = this.Userdata.getUserInfo().neighbours2;
     
     this.Userdata.userinfoObservable().subscribe((data:any)=>{
       if(data instanceof Object) {this.neighbours1 = data.neighbours1;
       this.neighbours2 = data.neighbours2}
     })
  }

  nextPage(form){
    if(form.status == "INVALID") {
      return this.ds.newMessage('error', 'Incorrect Form', "Please fill the required details correctly")
    }
    this.router.navigate(['/receiver/verification/pet'])
  }

  prevPage(){
    this.router.navigate(['/receiver/verification/userinfo'])
  }

}
