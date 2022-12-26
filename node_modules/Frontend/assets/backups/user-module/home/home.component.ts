import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
   unsub;
  //imagepath = 'http://localhost:8000/';
  imagepath = environment.server;
  post;
  category;
  fade = false;//map image fade on hover;
  layout;
  constructor(private ds:UserDataService, private router: Router) { }

  ngOnInit(): void {
    this.unsub = this.ds.GetLayout({}).subscribe((response)=>{
      console.log(response.data);
      this.post=response.data.banners;
      this.category=response.data.categories;
    },(error)=>{
      if(error instanceof ErrorEvent)
        this.ds.newMessage('error', 'Some error occured', 'sorry some error occured in the browser');
      else 
        this.ds.newMessage('error', 'Some error occured', error.status + " : " + error.error.message);
    });
  }

  go_to_ad(category) {
    this.router.navigate(['/ads/view'], {queryParams: {category : category}})
  }

  ngOnDestroy() : void {
    this.unsub.unsubscribe();
  }

}
