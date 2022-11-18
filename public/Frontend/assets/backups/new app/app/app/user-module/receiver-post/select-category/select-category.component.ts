import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdPostService } from 'src/app/services/ad-post.service';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { Ad, category } from '../../../services/dataModels';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.css']
})
export class SelectCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('modalButton')
    modalButton;
  submitting: boolean = false;
  duplicateAdId = null;
  categories : category[];
  ad : Ad;
  selectedCategory : string;
  unsub$ = new Subject();

  constructor(private ps: AdPostService, private router: Router, private ar: ActivatedRoute, private ss: StateService, private loader: LoaderService) { 
    this.selectedCategory = undefined;
  }

  ngOnInit(): void {
    this.ps.newPage(1);
    this.getCategories()
        .then(()=>{
            this.ar.queryParams.pipe(takeUntil(this.unsub$)).subscribe((data)=>{
              if(data.action == 'edit'){
                if(!data.adId)
                  console.log('no ad choosen to edit');
                else
                  this.editAd(data.adId);
              }
            });
        });
         
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      if(!session._id) {
        this.ps.newMessage('error', 'Login Needed', 'Please login to perform this action');
        this.router.navigate(['/']);
      }
    })
    
    this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
      this.ad = ad;
      if(this.ad instanceof Object && this.ad.categoryId)
        this.selectedCategory = this.ad.categoryId;
    });
  }
  
  getCategories(){ 
    return new Promise((res, rej)=>{
      this.ps.getCategories().pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
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
      else {
        this.selectedCategory = this.ad.categoryId; 
        return;
      }
    }
    this.load();
    this.ps.selectCategory(this.selectedCategory, adId).pipe(takeUntil(this.unsub$)).subscribe((response: any)=>{
      this.stopload();
      if(response.status){
        if(adId) {
          this.ad.categoryId = response.data.categoryId;
          this.ad.categoryName = response.data.categoryName;
          this.ps.NewAdData(this.ad);
        } else {
          this.ps.NewAdData(response.data);
        }
        return this.nextPage();
      } else {
        if(response.code){
          if(response.code == 'duplicate-record'){
            this.duplicateAdId = response.data.adId;
            return this.handle_duplicate(); 
          } if(response.code == 'no-record') {
            this.ps.newMessage('info', 'Category Not Found', response.message +", this category might be deleted");
          } else {
            this.ps.newMessage('error', 'Error', response.message);
          }
        } 
        if(adId)
          this.selectedCategory = this.ad.categoryId;
      }
      this.stopload(); 
    }, (error)=>{
        if(error instanceof ErrorEvent)
          this.ps.newMessage('error', 'Failed', 'sorry couldn\'t connect to the url');
        else  
          this.ps.newMessage('error', 'Failed', error.status + ": " + error.error.message);
        if(adId) 
          this.selectedCategory = this.ad.categoryId;
        this.stopload();
    })
  }

  nextPage(){ 
    console.log(this.selectedCategory);
    if(!this.selectedCategory) 
      return this.ps.newMessage('error', 'No Category Selected', 'Please select a category')
    if( this.selectedCategory == this.ad?.categoryId){
      this.ps.newMessage('success', 'Category Saved', 'selected category was saved');
      this.router.navigate(['/receiver/post/select-location']);
    } else 
      this.select_category();
  }

  editAd(adId : string) {
    this.ps.get_ad(adId).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
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


  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }

  handle_duplicate() {
    this.modalButton.nativeElement.click();
  }
  
  delete_previous() {
    this.load();
    this.ps.delete_with_category(this.selectedCategory, this.duplicateAdId).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      this.stopload();
      this.modalButton.nativeElement.click();
      if(response.status) {
        this.ps.newMessage('success', 'Previous Ad Deleted', 'Previous Ad was deleted');
      } else {
        this.ps.newMessage('error', 'Couldn\'t Delete Ad', response.message);
      }
    }, (error)=>{
      this.stopload();
      this.modalButton.nativeElement.click();
      if(error instanceof ErrorEvent)
        this.ps.newMessage('error', 'Error Occured', 'Sorry some error occured on the client');
      else 
        this.ps.newMessage('error', 'Couldn\'t Delete', error.error.message);
    })
  }

  ngOnDestroy() : void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }
}
