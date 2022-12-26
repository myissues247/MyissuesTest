import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  siteSetting: any = {};
  constructor(private ds: UserDataService, private layout: LayoutService) { }

  ngOnInit(): void {
    this.layout.layout().subscribe((response)=>{
      console.log(response);
      this.siteSetting = response;
    })
  }
  
  submit_query(form) {
    if(form.status == "INVALID")
      return this.ds.newMessage('error', 'Invalid Form', 'Please fill all the values correctly');
    
    this.ds.submit_query({name : form.value.name, email: form.value.email, message: form.value.message}).subscribe((response)=>{ 
      if(response.status) {
        this.ds.newMessage('success', 'Query Submitted', response.message);
      } else {
        this.ds.newMessage('error', 'Couldn\'t Submit', response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        this.ds.newMessage('error', 'Error Occured', 'Sorry some unknown error occured on the client');
      else 
        this.ds.newMessage('error', 'Couldn\'t Submit', error.error.message);
    })
  }
}
