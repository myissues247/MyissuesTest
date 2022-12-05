import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ObservableInput, Subject } from 'rxjs';
import { ServerResponse } from './dataModels';
import { environment } from 'src/environments/environment';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // baseURL = 'http://localhost:8000';
  baseURL= environment.server;
  login$ = new BehaviorSubject({}); //observes login and logout;
  session;
  message$ = new Subject();
  constructor(private http:HttpClient, private ss: StateService) {
         this.ss.getUserSessionObservable().subscribe((session)=>{
           this.session = session 
         })
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
   
     login(data) : void {
       sessionStorage.setItem('role', data.type);
       sessionStorage.setItem('_id', data._id);
       this.login$.next({'role': data.type, '_id': data._id, 'isLogged': true});
     }
     
     isLogged() : Observable<any> {
       return this.login$.asObservable();
     }
     
    //  logout() : void {
    //    sessionStorage.removeItem('role');
    //    sessionStorage.removeItem('_id');
    //    this.login$.next({'role': undefined, 'type': undefined, 'isLogged': false});
    //  }


    GetLayout(d):any{
      return this.http.get(this.baseURL + '/layout/get-site-layout', { withCredentials: true });
    }

    getsiteSetting() {
      return this.http.get(this.baseURL + '/layout/site-setting', {withCredentials: true});
    }

    getSiteSponsors(): any {
      return this.http.get(this.baseURL + '/layout/show/site-sponsors', {withCredentials: true});
    }

    AddUser(d):any{
      if(d.userType  == 'agency') 
        return this.http.post(this.baseURL + '/users/agency/sign-up', d, {withCredentials: true});
      else if(d.userType  == 'sponsor') 
        return this.http.post(this.baseURL + '/users/sponsors/sign-up', d, {withCredentials: true});
      else 
        return this.http.post(this.baseURL + '/users/sign-up',d, { withCredentials: true });
    }

    
    GetUser(d):any{
      if(d.role == 'agency')
        return this.http.post(this.baseURL + '/users/agency/sign-in', d, {withCredentials: true});
      if(d.role == 'sponsor')
        return this.http.post(this.baseURL + '/users/sponsors/sign-in', d, {withCredentials: true});
      else 
        return this.http.post(this.baseURL + '/users/sign-in',d, { withCredentials: true });
    }

    Auth(d):any{
      return this.http.get(this.baseURL + '/users/user-auth', { withCredentials: true });
    }

    get_countries(): any{
      return this.http.get(this.baseURL + '/layout/countries');
    }
    get_cities(countryId, stateName) : any {
      return this.http.post(this.baseURL + '/layout/country/state/all-grouped', {countryId, stateName});
    }
    
    /*
    get_countries_grouped(): any{
      return this.http.get(this.baseURL + "/layout/all-grouped");
    }
    */
    get_user_ads(query) : Observable<ServerResponse> {
      const {skip, adType} = query;
      if(query.owner == 'agency') 
         return this.http.get<ServerResponse>(`${this.baseURL}/users/agency/ads/all/${skip}`, {withCredentials : true});
      if(query.owner == 'sponsor')
         return this.http.get<ServerResponse>(`${this.baseURL}/users/sponsors/ads/all/${skip}`, {withCredentials: true});
      
      return this.http.get<ServerResponse>(`${this.baseURL}/users/receivers/ads/all/${skip}`, {withCredentials : true});
    }

    get_ads(query): any{
      return this.http.post(this.baseURL + '/layout/get-ads', query, {withCredentials: true});
    }

    search_ads(query) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(this.baseURL + '/layout/search-ads', query, {withCredentials: true});
    }

    get_ads_single(adId) : Observable<ServerResponse> { 
      return this.http.get<ServerResponse>(this.baseURL + '/layout/get-ads/' + adId);
    }
     
    get_ad_data(adId): any{
      if(this.session.type == 'agency') 
          return this.http.get(this.baseURL + '/users/agency/ads/view/' + adId, {withCredentials: true});
      return this.http.get(this.baseURL + '/users/receivers/ads/view/' + adId, {withCredentials: true});
    }

    get_bumps() : Observable<ServerResponse> {
      return this.http.get<ServerResponse>(`${this.baseURL}/users/bumps`, {withCredentials: true});
    }
    
    //payment intent for donation
    get_payment_intent(adId, amount) : Observable<ServerResponse> {
      // if(this.session.type == 'agency')
      //    return this.http.get<ServerResponse>(this.baseURL + `/users/agency/payment-intent/${adId}/${amount}`, {withCredentials: true});
      // if(this.session.type == 'sponsor')
      //    return this.http.post<ServerResponse>(this.baseURL + `/users/sponsor/payment-intent/${adId}/${amount}`,  {withCredentials: true});
      return this.http.get<ServerResponse>(this.baseURL + `/users/receivers/payment-intent/${adId}/${amount}`, {withCredentials: true});
    }
    

    purchase_bump_up(data) : Observable<ServerResponse> {
      if(this.session.type == 'agency')
        return this.http.post<ServerResponse>(this.baseURL + '/users/agency/bumps/purchase/' + data.bumpId, data, {withCredentials: true});
      if(this.session.type == 'sponsor')
        return this.http.post<ServerResponse>(this.baseURL + '/users/sponsor/bumps/purchase/' + data.bumpId, data, {withCredentials: true});
      return this.http.post<ServerResponse>(this.baseURL + '/users/bumps/purchase/' + data.bumpId , data, {withCredentials: true});
    }

    purchase_bump_up_with_bal(data) : Observable<ServerResponse> {
      if(this.session.type == 'agency')
        return this.http.post<ServerResponse>(this.baseURL + '/users/agency/bumps/purchase/balance/' + data.bumpId, data, {withCredentials: true});
      if(this.session.type == 'sponsor')
        return this.http.post<ServerResponse>(this.baseURL + '/users/sponsor/bumps/purchase/balance/' + data.bumpId, data, {withCredentials: true});
      return this.http.post<ServerResponse>(this.baseURL + '/users/bumps/purchase/balance/' + data.bumpId , data, {withCredentials: true});
    }
    
    bumpAd(adId) : Observable<ServerResponse>{
      if(this.session.type == 'agency') 
        return this.http.put<ServerResponse>(`${this.baseURL}/users/agency/ads/${adId}/bump`, {}, {withCredentials: true});
      else if(this.session.type == 'sponsor')
        return this.http.put<ServerResponse>(`${this.baseURL}/users/sponsors/ads/${adId}/bump`, {}, {withCredentials: true});
      return this.http.put<ServerResponse>(`${this.baseURL}/users/receivers/ads/${adId}/bump`, {}, {withCredentials: true});
    }

    //payment intent for bump up 
    get_payment_intent_for_bumpup(bumpId) : Observable<ServerResponse>{
      if(this.session.type == 'agency') 
          return this.http.get<ServerResponse>(this.baseURL + '/users/agency/bumps/paymentIntent/' + bumpId, {withCredentials: true});
      if(this.session.type == 'sponsor') 
          return this.http.get<ServerResponse>(this.baseURL + '/users/sponsor/bumps/paymentIntent/' + bumpId, {withCredentials: true});
      return this.http.get<ServerResponse>(this.baseURL + '/users/receivers/bumps/paymentIntent/' + bumpId, {withCredentials: true});
    }
    
    //if donerType is guest then call the guest router if it's the logged user then 
    //call the authenticated user donation router.
    complete_donation(data: any, donerType) : any{
      console.log(donerType)
      if(donerType == 'guest')
        return this.http.post(this.baseURL + "/users/receivers/donation/guest", data, {withCredentials : true, reportProgress: true, observe: 'events'});
      else if(donerType == 'regular')
        return this.http.post(this.baseURL + '/users/receivers/donation', data, {withCredentials: true, reportProgress: true, observe: 'events'});
    }
    
    withdraw_request(data) : Observable<ServerResponse>{
      const formData = new FormData();
      formData.append('identityDetail', data.identityProof);
      formData.append('bankDetails', data.bankDetails);
      formData.append('data', JSON.stringify(data));
      return this.http.post<ServerResponse>(`${this.baseURL}/users/withdraw`, formData, {withCredentials: true});
    }
    
    get_notifications() : Observable<ServerResponse>{
      return this.http.get<ServerResponse>(`${this.baseURL}/users/notifs/0/10`, {withCredentials : true});
    }

    submit_volunteer(data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/volunteer/register`, data, {withCredentials: true});
    }


    submit_query(data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/contact-us`, data, {withCredentials: true});
    }

    logout() : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/logout`, {}, {withCredentials: true});
    }

    get_all_cities() : Observable<ServerResponse> {
      return this.http.get<ServerResponse>(`${this.baseURL}/layout/all-cities`, {withCredentials: true});
    }

    get_agencies(data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/agencies`, data, {withCredentials: true})
    }
    
    report_ad(adId, data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/layout/report/ad/${adId}`, data, {withCredentials: true});
    }

    make_ad_favorite(data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/add/fav/ad`, data, {withCredentials: true});
    }

    make_ad_unfavorite(data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/remove/fav/ad`, data, {withCredentials: true});
    }

    donate_housings(data) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/receivers/donate-housing/`, data, {withCredentials: true});
    }

    resendVerification(d) : Observable<ServerResponse>{
      return this.http.post<ServerResponse>(`${this.baseURL}/users/resend-verification`, d, {withCredentials: true});
    }

    mailVerificaton(d):Observable<ServerResponse>{
      return this.http.put<ServerResponse>(`${this.baseURL}/users/verify-email`, d, {withCredentials: true});
    }

    resetPassword(d):Observable<ServerResponse>{
      return this.http.post<ServerResponse>(`${this.baseURL}/users/password-reset-request`, d, {withCredentials: true});
    }

    resetPasswordLink(d):Observable<ServerResponse>{
      return this.http.post<ServerResponse>(`${this.baseURL}/users/reset-password`, d, {withCredentials: true});
    }

    get_Stats_For_Year(d) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/ads/stats/year`, d, {withCredentials: true})
    }
    get_Stats_For_This_Week(d) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/ads/stats/week/current`, d, {withCredentials: true})
    }
    get_Stats_For_Last_Week(d) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/ads/stats/week/last`, d, {withCredentials: true})
    }


    getGlobalStates(code) : Observable<ServerResponse> {
      return this.http.get<ServerResponse>(`${this.baseURL}/layout/globe/country/${code}/states`, {withCredentials:true})
    }

    getGlobalCities(code, state) : Observable<ServerResponse> {
      return this.http.get<ServerResponse>(`${this.baseURL}/layout/globe/country/${code}/state/${state}/cities`, {withCredentials:true});
    }


// donation stats ......
    get_Donation_Stats_For_Year(d) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/donors/donation/stats/year`, d, {withCredentials: true})
    }
    get_Donation_Stats_For_This_Week(d) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/donors/donation/stats/week/current`, d, {withCredentials: true})
    }
    get_Donation_Stats_For_Last_Week(d) : Observable<ServerResponse> {
      return this.http.post<ServerResponse>(`${this.baseURL}/users/donors/donation/stats/week/last`, d, {withCredentials: true})
    }

}
