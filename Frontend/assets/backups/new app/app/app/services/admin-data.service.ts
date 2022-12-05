import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerResponse } from './dataModels';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {
  baseURL = environment.server;
  // baseURL='http://18.223.136.68';
  constructor(private http: HttpClient) {

  }

  //Start of Admin Data Service 
  signin(d): any {

    return this.http.post(this.baseURL + '/sign-in', d, { withCredentials: true });
  }

  changePasswordRequest(d): any {
    return this.http.post(this.baseURL + '/users/admin-password-reset-request', d, { withCredentials: true });
  }
  
  resetPasswordLink(d) : any {
    return this.http.post(this.baseURL + "/users/admin-reset-password", d, {withCredentials: true});
  }

  getprofile(d): any {
    return this.http.get(this.baseURL + '/profile', { withCredentials: true });
  }

  updateprofile(d): any {
    return this.http.put(this.baseURL + '/update-profile', d, { withCredentials: true });
  }

  updatepassword(d): any {
    return this.http.put(this.baseURL + '/change-password', d, { withCredentials: true });
  }

  //End of Admin Data Service

  //Start Of Banner Data Service

  newbanner(d): any {
    return this.http.post(this.baseURL + '/layout/banners/add', d, { withCredentials: true, reportProgress: true, observe: 'events' });
  }

  banner(d): any {
    return this.http.get(this.baseURL + '/layout/banners', { withCredentials: true });
  }

  BannerStatusEnable(d): any {
    return this.http.put(this.baseURL + '/layout/banners/status', d, { withCredentials: true });
  }

  BannerUpdate(d): any {
    return this.http.put(this.baseURL + '/layout/banners/update', d, { withCredentials: true, reportProgress: true, observe:'events' });
  }

  BannerDelete(d): any {
    let bannerId = d.bannerId;
    return this.http.delete(this.baseURL + '/layout/banners/' + bannerId, {withCredentials: true});
  }

  //End of Banner Data Service

  //Start of Site Data Service

  getsite(d): any {
    return this.http.get(this.baseURL + '/layout/settings', { withCredentials: true });
  }

  updateSite(d): any {
    return this.http.post(this.baseURL + '/layout/settings/update', d, { withCredentials: true });
  }
  //End of Site Data Service

  //site Sponsor 
   

  new_site_sponsor(d): any {
    return this.http.post(this.baseURL + '/layout/site-sponsors/add', d, { withCredentials: true, reportProgress: true, observe: 'events' });
  }

  site_sponsor(d): any {
    return this.http.post(this.baseURL + `/layout/site-sponsors`,d,  { withCredentials: true });
  }

  bulkSearch_siteSponsors(d): any {
    return this.http.post(this.baseURL + '/layout/site-sponsors/search', d, { withCredentials: true });
  }

  site_sponsor_status_enable(d): any {
    return this.http.put(this.baseURL + '/layout/site-sponsors/status', d, { withCredentials: true });
  }

  site_sponsor_update(d): any {
    return this.http.put(this.baseURL + '/layout/site-sponsors/update', d, { withCredentials: true, reportProgress: true, observe:'events' });
  }

  site_sponsor_delete(d): any {
    let siteSponsorId = d.siteSponsorId;
    return this.http.delete(this.baseURL + '/layout/site-sponsors/' + siteSponsorId, {withCredentials: true});
  }

  //site sponsors end


  //Start of Category Data Service

  newcategory(d): any {
    return this.http.post(this.baseURL + '/layout/categories/add', d, { withCredentials: true, reportProgress: true, observe: 'events'  });
  }

  category(d): any {
    return this.http.get(this.baseURL + '/layout/categories', { withCredentials: true});
  } 

  categoryUpdate(d): any {
    return this.http.put(this.baseURL + '/layout/categories/update', d, { withCredentials: true, reportProgress: true, observe: 'events' });
  }

  CategoryStatusEnable(d): any {
    return this.http.put(this.baseURL + '/layout/categories/status', d, { withCredentials: true });
  }

  CategoryDelete(d): any {
    let categoryId = d.categoryId;
    return this.http.delete(this.baseURL + '/layout/categories/' + categoryId, {withCredentials: true});
  }

  //End of Category Data Service

  //Start of Country Data Service

  AddProvice(d):any{
    return this.http.post(this.baseURL + '/layout/countries/add', d, { withCredentials: true });
  }

  country(d): any {
    let countryId='600e9e24e3de444b6ca96b75';
    return this.http.get(this.baseURL + '/layout/countries/all-grouped', { withCredentials: true });
  }

  CountryStatusEnable(d): any {
    return this.http.put(this.baseURL + '/layout/countries/status', d, { withCredentials: true });
  }

  AddState(d): any {
    return this.http.post(this.baseURL + '/layout/countries/states/add', d, { withCredentials: true });
  }

  RegionStatusEnable(d):any{
    return this.http.put(this.baseURL + '/layout/countries/states/status', d, { withCredentials: true });
  }
  
  StateDelete(d): any {
    let countryId = d.countryId;
    let stateName=d.stateName;
    return this.http.delete(this.baseURL + '/layout/countries/' + countryId+'/states/'+stateName, {withCredentials: true});
  }

  CountryDelete(d): any {
    let countryId = d.countryId;
    return this.http.delete(this.baseURL + '/layout/countries/' + countryId, {withCredentials: true});
  }

  AddCity(d): any {
    
    return this.http.post(this.baseURL + '/layout/countries/states/cities/add', d, { withCredentials: true });
  }

  CityStatusEnable(d):any{
    return this.http.put(this.baseURL + '/layout/countries/states/city/status', d, { withCredentials: true });
  }

  CityDelete(d): any {
    let countryId = d.countryId;
    let cityId=d.cityId;
    return this.http.delete(this.baseURL + '/layout/countries/' + countryId+'/states/cities/'+cityId, {withCredentials: true});
  }

  RegionUpdate(d):any{
    return this.http.put(this.baseURL + '/layout/countries/states/update', d, { withCredentials: true });
  }

  ProvinceUpdate(d):any{
    return this.http.put(this.baseURL + '/layout/countries/update', d, { withCredentials: true });
  }

  CityUpdate(d):any{
    return this.http.put(this.baseURL + '/layout/countries/states/cities/update', d, { withCredentials: true });
  }

  //End of Country Data Service


  // Start of User Manage Data Services

  GetUser(d):any{
    return this.http.post(this.baseURL + '/user-control/receivers/get-all',d, { withCredentials: true })
  }

  GetSpecificUser(d): any {
    let id = d.id;
    return this.http.get(this.baseURL + '/user-control/receivers/get-single/' + id,{withCredentials	:true});
  }

   // End of User Manage Data Services

   
   // ad plan ...
   get_main_page_ad_plan() : any {
     return this.http.get(this.baseURL + '/ad-plan/main-page-plan' , {withCredentials: true});
   }

   get_page_1_ad_plan() : Observable<ServerResponse> {
     return this.http.get<ServerResponse>(this.baseURL + '/ad-plan/page1-plan', {withCredentials: true})
   }


   add_new_plan_category(data) : Observable<ServerResponse>{
     return this.http.put<ServerResponse>(this.baseURL + `/ad-plan/${data.planId}/categories/new`, data, {withCredentials: true});
   }

   update_plan_category(data) : Observable<ServerResponse> {
     return this.http.put<ServerResponse>(this.baseURL + `/ad-plan/${data.planId}/categories/update`, data, {withCredentials: true});
   }

   change_plan_status(data) : Observable<ServerResponse> {
     return this.http.put<ServerResponse>(this.baseURL + `/ad-plan/${data.planId}/categories/status`, data, {withCredentials: true})
   }

   delete_plan_category(data): Observable<ServerResponse> {
     return this.http.delete<ServerResponse>(this.baseURL + `/ad-plan/${data.planId}/categories/${data.categoryId}`, {withCredentials: true});
   }
   

//  Start of Doner Data Service
  Get_Doner(d):any{
    return this.http.post(this.baseURL + '/user-control/doners/get-all',d, { withCredentials: true })
  }
  
  GetDonerSingle(donerId) : any{
    return this.http.get(this.baseURL + '/user-control/doners/get-single/' + donerId, {withCredentials: true})
  }

  DonerApprove(d): any {
    return this.http.put(this.baseURL + '/user-control/doners/approve', d, { withCredentials: true });
  }

  DonerReject(d): any {
    return this.http.put(this.baseURL + '/user-control/doners/reject', d, { withCredentials: true });
  }
  
  change_Doner_Access(d):any{
    return this.http.put(this.baseURL + `/user-control/doners/change-access`, d, { withCredentials: true });
  }

  bulkSearch_donors(query):any {
    return this.http.post(this.baseURL + `/user-control/doners/search`, query, {withCredentials: true})
  } 

//doner end
  
  get_only_cities() : Observable<ServerResponse>{
    return this.http.get<ServerResponse>(`${this.baseURL}/layout/only-cities`, {withCredentials: true});
  }

  get_volunteers_all(data) : any {
    return this.http.post(`${this.baseURL}/volunteer-control/get-all`, data, {withCredentials: true});
  }

  get_volunteers_unapproved(data) : any {
    return this.http.post(`${this.baseURL}/volunteer-control/get/unapproved`, data, {withCredentials: true})
  }

  get_volunteers_approved(data) : any {
    return this.http.post(`${this.baseURL}/volunteer-control/get/approved`, data, {withCredentials: true})
  }

  get_volunteer_single(id) : any {
    return this.http.get(`${this.baseURL}/volunteer-control/get-single/${id}`, {withCredentials: true});
  }
  
  approve_volunteer(id) : any {
    return this.http.put(`${this.baseURL}/volunteer-control/approve/${id}`, {withCredentials: true})
  }

  reject_volunteer(id) : any {
    return this.http.put(`${this.baseURL}/volunteer-control/reject/${id}`, {withCredentials: true})
  }

  update_volunteer(data) : any {
    return this.http.put(`${this.baseURL}/volunteer-control/update-details`, data,{withCredentials: true})
  }
  
  bulkSearch_volunteer(query) : any {
    return this.http.post(`${this.baseURL}/volunteer-control/search`, query, {withCredentials: true});
  }

  get_withdrawl_requests(data) : any{
    return this.http.put(`${this.baseURL}/user-control/receivers/withdrawl-requests/`, data,{withCredentials: true})
  }
 
  get_single_wRequest(id) : any{
    return this.http.get(`${this.baseURL}/user-control/receivers/withdrawl-requests/${id}`,{withCredentials: true})
  }

  bulkSearch_wRequests(query) : any {
    return this.http.post(`${this.baseURL}/user-control/receivers/withdrawl-requests/search/query`, query, {withCredentials: true});
  }
  
  getWithdrawRequestTotal() : any {    
    return this.http.get(`${this.baseURL}/user-control/receivers/withdrawl-requests/requests/total-count`, {withCredentials: true});
  }


  // Start of Receiver Data Service

  getReceiverAllAds(d):any{
    return this.http.post(this.baseURL + `/user-control/receivers/ads/published/0`, d, { withCredentials: true })
  }
  getReceiverAllAdsOld(d):any{
    return this.http.get(this.baseURL + `/user-control/receivers/ads/published/${d.id}/0`, { withCredentials: true })
  }
  updateReceiverAd(d):any{
    return this.http.put(this.baseURL + `/user-control/receivers/ads/${d.adId}/status`, d, { withCredentials: true });
  }

  getSingleAdData(adId) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/user-control/receivers/ads/${adId}`, {withCredentials: true});
  }
  // End of Receiver Data Service
  

  approveReceiverAd(d):any{
    return this.http.post(this.baseURL + `/user-control/receivers/ads/${d.adId}/approval/approved`, d, { withCredentials: true });
  }

  rejectReceiverAd(d):any{
    return this.http.post(this.baseURL + `/user-control/receivers/ads/${d.adId}/approval/rejected`, d, { withCredentials: true });
  }

  withdrawRequest(d):any{
    return this.http.post(this.baseURL + `/user-control/users//withdraw-requests`, d, { withCredentials: true });
  }
  


  /***** Donations ******/
  getDonations(d) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/user-control/doners/donations/all', d, {withCredentials: true});
  }

  getDonationDetail(donationId) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.baseURL + '/user-control/doners/donation/'+ donationId, {withCredentials: true});
  }

  bulkSearch_donations(query) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/user-control/doners/donations/search', query, {withCredentials: true})
  }

    /***** Donations Ends ******/


  /**** transactions  *******/
  get_transactions_all(query) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/user-control/users/transactions/all', query, {withCredentials: true});
  }

  get_transactions_single(id) : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.baseURL + "/user-control/users/transaction/" + id, {withCredentials: true});
  }

  get_total_transactions(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.baseURL + '/user-control/users/transactions/total', {withCredentials: true})
  }

  bulkSearch_transactions(d): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/user-control/users/transactions/search', d ,{withCredentials: true})
  }

  /**** transactions end ******/

  approveAgency(d):any{
    return this.http.put(this.baseURL + `/user-control/agency/approve`, d, { withCredentials: true });
  }

  rejectAgency(d):any{
    return this.http.put(this.baseURL + `/user-control/agency/reject`, d, { withCredentials: true });
  }



  // Start of Agency Data Service

  getAllAgencyDetail(d):any{
    return this.http.post(this.baseURL + `/user-control/agency/get-all`, d, { withCredentials: true });
  }

  getAgencyFullData(d) : any {
    return this.http.get(this.baseURL + `/user-control/agency/get-single/${d.id}`, {withCredentials: true})
  }
  
  updateAccessLevel(d):any{
    return this.http.put(this.baseURL + `/user-control/agency/change-access`, d, { withCredentials: true });
  }

  // End of Agency Data Service

    // Start of agencay Data Service

    getAgencyAllAds(d):any{
      return this.http.post(this.baseURL + `/user-control/agency/ads`, d, { withCredentials: true })
    }
    getSingleAd(id):any{
      return this.http.get(this.baseURL + `/user-control/agency/ads/` + id, { withCredentials: true })
    }
    updateAgencyAd(d):any{
      return this.http.put(this.baseURL + `/user-control/agency/ads/${d.adId}/status`, d, { withCredentials: true });
    }
    approveAgencyAd(d):any{
      return this.http.post(this.baseURL + `/user-control/agency/ads/${d.adId}/approval/approved`, d, { withCredentials: true });
    }
  
    rejectAgencyAd(d):any{
      return this.http.post(this.baseURL + `/user-control/agency/ads/${d.adId}/approval/rejected`, d, { withCredentials: true });
    }
    // End of agency Data Service

 // receiver 
 updateReceiver(d): any {
   return this.http.put(this.baseURL + `/user-control/receivers/update-details`, d, {withCredentials: true});
 }
 
 approveReceiver(d):any{
  return this.http.put(this.baseURL + `/user-control/receivers/approve`, d, { withCredentials: true });
}

rejectReceiver(d):any{
  return this.http.put(this.baseURL + `/user-control/receivers/reject`, d, { withCredentials: true });
}

change_Receiver_Access(d):any{
  return this.http.put(this.baseURL + `/user-control/receivers/change-access`, d, { withCredentials: true });
}

bulkSearch_receiver(query):any {
  return this.http.post(this.baseURL + `/user-control/receivers/search`, query, {withCredentials: true})
} 

bulkSearch_receiver_ads(query): any {
  return this.http.post(this.baseURL + `/user-control/receivers/ads/search`, query, {withCredentials: true})
}
 //end receiver


  // Start Of Bump Up Count Data Service

  createNewBumpUpCount(d):any{
    return this.http.post(this.baseURL + `/ad-plan/bumps/new`, d, { withCredentials: true });
  }

  getAllBumpUpCount(d):any{
    return this.http.get(this.baseURL + `/ad-plan/bumps/all`, { withCredentials: true })
  }

  updateBumpUpCount(d):any{
    return this.http.put(this.baseURL + `/ad-plan/bumps/${d.bumpId}/update`, d, { withCredentials: true });
  }

  deleteBumpUpCount(d):any{
    return this.http.delete(this.baseURL + `/ad-plan/bumps/${d.bumpId}`,{ withCredentials: true });
  }

  updateBumpUpCountStatus(d):any{
    return this.http.put(this.baseURL + `/ad-plan/bumps/${d.bumpId}/status`, d, { withCredentials: true });
  }

  // End Of Bump Up Count Data Service


  // agency Categories api
  
  get_agency_categories() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(this.baseURL + '/layout/agency-categories', {withCredentials: true});
  }

  add_agency_categories(data) : Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseURL + '/layout/agency-categories/add', data, {withCredentials: true});
  }

  update_agency_categories(data) : Observable<ServerResponse> {
    return this.http.put<ServerResponse>(this.baseURL + '/layout/agency-categories/update', data, {withCredentials: true});
  }

  delete_agency_categories(data) : Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(this.baseURL + '/layout/agency-categories/'+ data.categoryId, {withCredentials: true});
  }

  update_agency_categories_status(data) : Observable<ServerResponse> {
    return this.http.put<ServerResponse>(this.baseURL + '/layout/agency-categories/status', data, {withCredentials: true});
  }

  //agency categories api end


    // Start of Agency Data Service

    getAllSponsorDetail(d):any{
      return this.http.post(this.baseURL + `/user-control/sponsors/get-all`, d, { withCredentials: true });
    }
    
    getSponsorFullData(d) : any {
      return this.http.get(this.baseURL + `/user-control/sponsors/get-single/${d.id}`, {withCredentials: true})
    }

    updateSponsorAccessLevel(d):any{
      return this.http.put(this.baseURL + `/user-control/sponsors/change-access`, d, { withCredentials: true });
    }
    
    approveSponsor(d):any{
      return this.http.put(this.baseURL + `/user-control/sponsors/approve`, d, { withCredentials: true });
    }
  
    rejectSponsor(d):any{
      return this.http.put(this.baseURL + `/user-control/sponsors/reject`, d, { withCredentials: true });
    }
  
    // End of Agency Data Service
  
      // Start of agencay Data Service
  
      getSponsorAllAds(d):any{
        return this.http.post(this.baseURL + `/user-control/sponsors/ads`, d, { withCredentials: true })
      }
      getSponsorSingleAd(id):any{
        return this.http.get(this.baseURL + `/user-control/sponsors/ads/` + id, { withCredentials: true })
      }
      updateSponsorAd(d):any{
        return this.http.put(this.baseURL + `/user-control/sponsors/ads/${d.adId}/status`, d, { withCredentials: true });
      }
      approveSponsorAd(d):any{
        return this.http.post(this.baseURL + `/user-control/sponsors/ads/${d.adId}/approval/approved`, d, { withCredentials: true });
      }
    
      rejectSponsorAd(d):any{
        return this.http.post(this.baseURL + `/user-control/sponsors/ads/${d.adId}/approval/rejected`, d, { withCredentials: true });
      }

      deleteAdImage_sponsor(adId, adImage) : Observable<any> { 
        const data = {
          adImage,
          adId : adId
        }
        return this.http.put(`${this.baseURL}/user-control/sponsors/ad-media/adImages/delete`, data, {withCredentials: true});
      }

      updateAd_sponsor(data) : Observable<any> {
        return this.http.put(`${this.baseURL}/user-control/sponsors/ad/update`, data, {withCredentials: true});
      }

      bulkSearch_sponsor(query):any {
        return this.http.post(this.baseURL + `/user-control/sponsors/search`, query, {withCredentials: true})
      } 

      bulkSearch_sponsor_ads(query):any {
        return this.http.post(this.baseURL + `/user-control/sponsors/ads/search`, query, {withCredentials: true})
      } 

      // End of agency Data Service


      get_queries(d): any {
        return this.http.post(this.baseURL + '/user-control/users/queries', d, {withCredentials: true})
      }

      bulkSearch_queries(d): any {
        return this.http.post(this.baseURL + '/user-control/users/queries/search', d, {withCredentials: true});
      }

      get_reports(d) : any {
        return this.http.post(this.baseURL + "/reports", d, {withCredentials: true});
      }

      bulkSearch_reports(d): any {
        return this.http.post(this.baseURL + '/reports/search', d, {withCredentials: true});
      }


      logout(d): any {

        return this.http.post(this.baseURL + '/logout', d, { withCredentials: true });
      }


//add agency
      get_all_cities() : Observable<ServerResponse> {
        return this.http.get<ServerResponse>(`${this.baseURL}/layout/all-cities`, {withCredentials: true});
      }
      
      agency_verification(data, agencyId=null) : Observable<any>{
        const {incorporationCertificate, bankDetails, agencyData}  = data;
        agencyData.agencyId = agencyId;
        const formData = new FormData();
        formData.append('incorporationCertificate', incorporationCertificate);
        formData.append('bankDetails', bankDetails);
        formData.append('data', JSON.stringify(agencyData));
        
        if(agencyId) {
          return this.http.post(`${this.baseURL}/user-control/agency/update`, formData, {withCredentials: true, reportProgress: true, observe: 'events'});
        }

        return this.http.post(`${this.baseURL}/user-control/agency/add`, formData, {withCredentials: true, reportProgress: true, observe: 'events'});
      }
    
      get_profile(volunteerId) : Observable<ServerResponse> {
        return this.http.get<ServerResponse>(`${this.baseURL}/user-control/agency/profile/${volunteerId}`, {withCredentials: true})
      }
 //add agency end  
 
 //donor edit 
 doner_verification(data, donorId=null) : Observable<any>{
  const {identityDetails, identityImages, UserData} = data;
  const formData = new FormData();
  formData.append('identityDetail', identityDetails);
  // formData.append('bankDetails', this.identityDetails);
  UserData.donorId = donorId;
  formData.append('data', JSON.stringify(UserData));
  identityImages.map((file)=>{
    formData.append('identityImages', file);
  });
  return this.http.post<any>(`${this.baseURL}/user-control/doners/update`, formData, {withCredentials: true, reportProgress: true, observe: 'events'});
}

get_donor_profile(donorId) : Observable<ServerResponse> {
  return this.http.get<ServerResponse>(`${this.baseURL}/user-control/doners/get-single/${donorId}`, {withCredentials: true})
}

//ad edit 

get_edit_ad_selector() : Observable<any> {
  return this.http.get(this.baseURL + '/ad-options', { withCredentials : true});
}

getCategories(): Observable<any>{
  return this.http.get(this.baseURL  + '/layout/categories', { withCredentials: true });
}

get_cities(countryId, stateName) : any {
  return this.http.post(this.baseURL + '/layout/country/state/all-grouped', {countryId, stateName});
}

get_countries(): any{
  return this.http.get(this.baseURL + '/layout/countries');
}

deleteAdImage(adId, adImage) : Observable<any> {
  const data = {
    adImage,
    adId : adId
  }
  return this.http.put(`${this.baseURL}/user-control/receivers/ad-media/adImages/delete`, data, {withCredentials: true});
}

updateAd(data) : Observable<any> {
  return this.http.put(`${this.baseURL}/user-control/receivers/ad/update`, data, {withCredentials: true});
}

 
//ad edit end

// agency ad edit ======================================================
get_edit_ad_selector_agency() : Observable<any> {
  return this.http.get(this.baseURL + '/ad-options/agency', { withCredentials : true});
}

deleteAdImage_agency(adId, adImage) : Observable<any> { 
  const data = {
    adImage,
    adId : adId
  }
  return this.http.put(`${this.baseURL}/user-control/agency/ad-media/adImages/delete`, data, {withCredentials: true});
}

updateAd_agency(data) : Observable<any> {
  return this.http.put(`${this.baseURL}/user-control/agency/ad/update`, data, {withCredentials: true});
}

bulkSearch_agency(query):any {
  return this.http.post(this.baseURL + `/user-control/agency/search`, query, {withCredentials: true})
} 

bulkSearch_agency_ads(query):any {
  return this.http.post(this.baseURL + `/user-control/agency/ads/search`, query, {withCredentials: true})
} 

// agency ad edit==============================================================


 donated_housings_all(query): Observable<any> {
   return this.http.post(`${this.baseURL}/user-control/receivers/donated-housings/all`, query, {withCredentials: true});
 }

 donated_housings_single(id): Observable<any> {
   return this.http.get(`${this.baseURL}/user-control/receivers/donated-housings/single/${id}`, {withCredentials: true});
 }
 
 allot_housing(data): Observable<any> {
   return this.http.post(`${this.baseURL}/users-control/receivers/donated-housings/allot`, data, {withCredentials: true});
 }

 bulkSearch_donatedHousing(data) : Observable<any> {
   return this.http.post(`${this.baseURL}/users-control/receivers/donated-housings/search`, data, {withCredentials: true});
 }
 
 getDonatedHousingAds(d):any{
  return this.http.post(this.baseURL + `/user-control/receivers/donated-housings/ads`, d, { withCredentials: true })
 }

 bulkSearch_housingAds(query): any {
  return this.http.post(this.baseURL + `/user-control/receivers/donated-housings/ads/search`, query, {withCredentials: true})
 }

 // donated housing end


  getDashboard() : Observable<any> {
    return this.http.get(`${this.baseURL}/stats`, {withCredentials: true});
  }


  get_logs(d): any {
    return this.http.post(this.baseURL + '/user-control/users/logs', d, {withCredentials: true})
  }
}
