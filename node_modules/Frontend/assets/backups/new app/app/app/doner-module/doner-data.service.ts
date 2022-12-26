import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServerResponse } from '../services/dataModels';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonerDataService {

  baseURL = environment.server;
  UserData={
    
      firstname:'',
      lastname:'',
      age:null,
      email:'',
      dob:null,
      contact:null,
      address:'',
      state:'',
      city:'',
      zipCode:null,
      area:'',

  } 
  identityImages : File[];
  identityDetails : File;
  
  identityImagesServer = [];
  identityDetailsServer = {
    mimetype: '',
    filepath: ""
  }

  //bankDetails : File;
  getUserInfo(){
    return this.UserData;
  }
  setUserInfo(value){
      this.UserData=value;
  }

  constructor(private http: HttpClient) {}
  
  
  doner_verification() : Observable<any>{
    const formData = new FormData();
    formData.append('identityDetail', this.identityDetails);
    // formData.append('bankDetails', this.identityDetails);
    formData.append('data', JSON.stringify(this.UserData));
    this.identityImages.map((file)=>{
      formData.append('identityImages', file);
    });
    return this.http.post<any>(`${this.baseURL}/users/doner/verification`, formData, {withCredentials: true, reportProgress: true, observe: 'events'});
  }

  get_profile() : Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.baseURL}/users/profile`, {withCredentials: true})
  }

  deleteIdentityImage(image) : Observable<any> {
    return this.http.put<any>(`${this.baseURL}/users/doners/identityImage/delete`, {image}, {withCredentials: true});
  } 
}
