import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ad, AgencyAd, ServerResponse } from '../../services/dataModels';

@Injectable({
  providedIn: 'root'
})
export class AgencyAdServiceService {
  lock = false;
  url = environment.server;
  ad$ = new BehaviorSubject({});
  message$ = new Subject();
  private _currentAd : Ad;
  page$ = new Subject();
  newPlanTaken$ = new BehaviorSubject({});
  private _newPlanTaken : any;
  constructor(private http: HttpClient) { }
   
  newPage(number) {
    this.page$.next(number);
  }

   AdObservable() : Observable<any>{
       return this.ad$.asObservable();
   }

   NewAdData(ad : Ad): void{
    console.log(ad);
    if(ad == null){
      if(this.lock == true){
        console.log(this.lock)
        return;
       }
     }
     this._currentAd = ad;
     this.ad$.next(this._currentAd);
     console.log(this._currentAd);
   }
   
   messageObserver(): Observable<any>{
     return this.message$.asObservable();
   }

   newMessage(severity: string, summary: string, detail: string): void{
      const messageObject = {
        severity,
        summary,
        detail
      }
      this.message$.next(messageObject);
   }

   adPlanTakenObservable() : Observable<any>{
     return this.newPlanTaken$.asObservable();
   }

   newPlanTake(plan) {
     if(plan instanceof Object) 
       this.newPlanTaken$.next(plan);
     console.log(plan);
   }

   
  getCategories(): Observable<any>{
    return this.http.get(this.url  + '/layout/categories', { withCredentials: true });
  }

  selectCategory(categoryId: string, adId : string): Observable<any>{
    if(typeof adId === 'string'){
       return this.http.put<ServerResponse>(`${this.url}/users/agency/ads/${adId}/update-category`, {categoryId}, { withCredentials: true });
    } else 
        return this.http.post(this.url + '/users/agency/start-new-ad', {categoryId}, { withCredentials: true });
  }

  selectLocation(countryId, country, state, city) {
    // const adId = this._currentAd._id;
    const data = {
      countryId,
      country, 
      state,
      city,
      // adId
    }
    return this.http.post(this.url + '/users/agency/start-new-ad', data, { withCredentials: true }); //need credentials
  }

  updateLocation(countryId, country, state, city) {
    // const adId = this._currentAd._id;
    const data = {
      countryId,
      country, 
      state,
      city,
      adId : this._currentAd._id
    }
    return this.http.put(this.url + '/users/agency/ad-location', data, { withCredentials: true }); //need credentials
  }

  save_ad_content(adContent) : Observable<any>{
    return this.http.put(`${this.url}/users/agency/ad/${this._currentAd._id}/ad-details`, adContent, { withCredentials: true });
  }

  save_ad_images(adImages: []) : Observable<any>{
    const formData = new FormData();
    adImages.forEach((image)=>{
      formData.append('adImages', image);
    })
    formData.append('adId', this._currentAd?._id);
    return this.http.put(`${this.url}/users/agency/ad-media/adImages`, formData, { withCredentials: true, observe: 'events', reportProgress: true });
  }
   
  deleteAdImage(adImage) : Observable<any> {
    const data = {
      adImage,
      adId : this._currentAd?._id
    }
    return this.http.put(`${this.url}/users/agency/ad-media/adImages/delete`, data, {withCredentials: true});
  }


  save_identity_images(adImages: []) : Observable<any>{
    const formData = new FormData();
    adImages.forEach((image)=>{
      formData.append('identityImages', image);
    })
    formData.append('adId', this._currentAd?._id);
    return this.http.put(`${this.url}/users/agency/ad-media/identityImages`, formData, { withCredentials: true,  observe: 'events', reportProgress: true  });
  }

  save_ad_video(adVideo : any) : any{
    const formData = new FormData();
    console.log(adVideo);
    formData.append('adVideo', adVideo);
    formData.append('adId', this._currentAd?._id);
    return this.http.put(`${this.url}/users/agency/ad-media/adVideo`, formData, {withCredentials: true,  observe: 'events', reportProgress: true })
  }

  save_contact(contact): Observable<any>{
    contact.adId = this._currentAd._id;
    return this.http.put(`${this.url}/users/agency/ad-user-details`, contact, { withCredentials: true });
  }

  get_ad_plans(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.url}/users/agency/ad-plans`, {withCredentials: true});
  }

  select_ad_plan(planId, categoryId): Observable<ServerResponse> {
    const data = {
      adId : this._currentAd._id,
      planId : planId,
      categoryId : categoryId
    }
    return this.http.put<ServerResponse>(`${this.url}/users/agency/ad-plans/subscribe`, data, { withCredentials: true })
  }

  get_payment_intent(planId, categoryId): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(`${this.url}/users/agency//payment-intent/plan/${planId}/${categoryId}`, {withCredentials: true});
  }

  get_ad(adId): Observable<ServerResponse>{
    return this.http.get<ServerResponse>(`${this.url}/users/agency/ads/${adId}`, {withCredentials: true});
  }
  
  delete(adId) : Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.url}/users/agency/ads/${adId}`, {withCredentials: true});
  }

  upgrade_plan(data) : Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.url}/users/agency/ads/${data.adId}/upgrade-card`, data, {withCredentials: true});
  }
  
  publish_plan(data) : Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.url}/users/agency/ads/${data.adId}/publish-with-plan`, data, {withCredentials: true});
  }

  publish_normal(adId) : Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.url}/users/agency/ads/${adId}/publish`, {}, {withCredentials: true});
  }

  copy_ad(adId : string) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.url}/users/agency/copy-ad/${adId}`, {withCredentials : true})
  }

  ad_status(adId : string, status: boolean) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.url}/users/agency/ad-status/${adId}/${status}`, {withCredentials: true});
  }
}
