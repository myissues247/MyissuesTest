import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit, Output } from '@angular/core';
import { NgControlStatus } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as EventEmitter from 'events';
import { AdPostService } from 'src/app/services/ad-post.service';
import { Ad, category } from '../../../services/dataModels';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit {
  categories : category[];
  ad : Ad;
  selectedCategory : string;
  constructor(private ps: AdPostService, private router: Router, private ar: ActivatedRoute) { 
    this.selectedCategory = undefined;
  }

  ngOnInit(): void {
    this.getCategories()
        .then(()=>{
            this.ar.queryParams.subscribe((data)=>{
              if(data.action == 'edit'){
                if(!data.adId)
                  console.log('no ad choosen to edit');
                else
                  this.editAd(data.adId);
              }
            });
        });
         
    this.ps.AdObservable().subscribe((ad: Ad)=>{
      this.ad = ad;
      if(this.ad instanceof Object && this.ad.categoryId)
        this.selectedCategory = this.ad.categoryId;
    });
  }
  
  getCategories(){ 
    return new Promise((res, rej)=>{this.ps.getCategories().subscribe((response: any)=>{
      if(response.status){
        this.categories = response.data.categories;
        return res(true);
      } else {
        this.ps.newMessage('error', 'Failed', 'couldn\'t fetch categories');
      }
      rej(false);
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        this.ps.newMessage('error', 'Failed', 'couldn\'t connect to the url');
      else 
        this.ps.newMessage('error', 'Failed', `${error.status}: ${error.error.message}`);
      rej(false);
    });})
  }

  select_category(){
    let adId = null;
    //check if the action is to updated already initialized ad category.
    if(this.ad instanceof Object && this.ad._id){
      if(confirm('category is already selected, do you want to change ad category?'))
         adId = this.ad._id;
      else 
         return;
    }
    this.ps.selectCategory(this.selectedCategory, adId).subscribe((response: any)=>{
      if(response.status){
        console.log(response.data);
        if(adId) {
          this.ad.categoryId = response.data.categoryId;
          this.ad.categoryName = response.data.categoryName;
          this.ps.NewAdData(this.ad);
        } else {
          this.ps.NewAdData(response.data);
        }
        this.nextPage();
      } else {
        console.log(response);
        if(response.code){
          if(response.code == 'duplicate-entry'){
            this.ps.newMessage('Error', 'Already Exists', 'you have an ad with this category already present'); // implement either delete(draft) or load(draft) or view(published);
          } if(response.code == 'no-record') {
            this.ps.newMessage('info', 'Category Not Found', response.message +", this category might be deleted");
          } else {
            this.ps.newMessage('error', 'Error', response.message);
          }
        } 
        if(adId)
          this.selectedCategory = this.ad.categoryId;
      } 
    }, (error)=>{
        if(error instanceof ErrorEvent)
          this.ps.newMessage('error', 'Failed', 'sorry couldn\'t connect to the url');
        else  
          this.ps.newMessage('error', 'Failed', error.status + ": " + error.error.message);
        if(adId) 
          this.selectedCategory = this.ad.categoryId;
    })
  }

  nextPage(){
    console.log(this.selectedCategory);
    if(this.selectedCategory == this.ad.categoryId){
      this.ps.newMessage('success', 'Category Saved', 'selected category was saved');
      this.router.navigate(['/receiver-ad/select-location']);
    } else 
      this.select_category();
  }

  editAd(adId : string) {
    this.ps.get_ad(adId).subscribe((response)=>{
      if(response.status){
        this.ps.NewAdData(response.data);
      } else {
        console.log(response);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        alert("sorry some unknown error occured");
      else 
        alert(error.status + ":" + error.error.message);
    });
  }
}
