import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  baseURL = environment.server;
  userInfo;
  UserData={
    PersonalInfo:{
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
      identityImages : [],
    },
    neighbours1 : {
      name : "",
      contact: "",
      extension : "",
      occupation: "",
      organization: "",
    }, 
    neighbours2: {
      name : "",
      contact: "",
      extension : "",
      occupation: "",
      organization: "",
    },
    PetInfo:{ 
      petName:'',
      petType: '',
      petAdTitle:'',
      petIssue:'',
      petImage:'',
    },
    
    petImageServer : '',
    identityImagesServer : [],
    bankDetailsServer : {
      mimetype: "",
      filepath: ""
    },
  
    identityDetailsServer : {
      mimetype: "",
      filepath: ""
    }
  }

  bankDetails : File;
  identityDetails : File;
  
  
  userinfoObservable() {
    return this.userInfo.asObservable();
  }
  
  getUserInfo(){
    return this.UserData;
  }
  setUserInfo(value){
      this.UserData=value;
  }

  newUserData() {
    this.userInfo.next(this.UserData);
  }

  constructor(private http: HttpClient) {
    this.userInfo = new Subject();
  }
  
  
  receiver_verification(data) : Observable<any>{
    const formdata :any = JSON.parse(JSON.stringify(data));
    let petImage;
    if(data.PetInfo.petImage instanceof File){
     petImage = data.PetInfo.petImage;
     delete formdata.PetInfo.petImage
    }
    const identityImages = data.PersonalInfo.identityImages;
    delete formdata.PersonalInfo.identityImages
    
    const formData = new FormData();
    formData.append('identityDetail', this.identityDetails);
    formData.append('bankDetails', this.bankDetails);
    formData.append('data', JSON.stringify(formdata));
    formData.append('petImage', petImage);
    identityImages.map((file)=>{
      formData.append('identityImages', file);
    });
    return this.http.post<any>(`${this.baseURL}/users/receiver/verification`, formData, {withCredentials: true, reportProgress:true, observe: 'events'});
  }


  get_receiver_verification(): Observable<any> {
    return this.http.get<any>(`${this.baseURL}/users/profile`, {withCredentials: true});
  }

  deleteIdentityImage(image) : Observable<any> {
    return this.http.put<any>(`${this.baseURL}/users/receivers/identityImage/delete`, {image}, {withCredentials: true});
  } 
}
