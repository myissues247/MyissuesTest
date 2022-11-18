import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import {MenuItem, ConfirmationService} from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-receiver-verification',
  templateUrl: './receiver-verification.component.html',
  styleUrls: ['./receiver-verification.component.css'],
  providers: [UserdataService, ConfirmationService]
})
export class ReceiverVerificationComponent implements OnInit, OnDestroy {
  loading : boolean = false;
  submitting: boolean = false;
  items: MenuItem[];
  activeIndex: number = 1;
  unsub$ = new Subject()
  constructor(private userData: UserdataService, private ss: StateService, private ds: UserDataService, private cnfrm: ConfirmationService, private router: Router) { 
    this.items = [{
      label: 'User',
      command: (event: any) => {
        this.activeIndex = 0;
    },
      routerLink: 'userinfo'
  },
  {
      label: 'Neighbour',
      routerLink: 'neighbour',
      command: (event: any) => {
        this.activeIndex = 1;
    }
  },
  {
      label: 'Pet',
      routerLink: 'pet',
      command: (event: any) => {
        this.activeIndex = 2;
    }
  },
  {
    label: 'Confirmation',
    routerLink: 'confirm',
    command: (event: any) => {
      this.activeIndex = 3;
  }
}
];
}

  ngOnInit(): void {
    this.spinner()
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      if(session.verificationStatus == 2) {
        this.confirm();
      }
      this.spinnerClose();
        this.userData.get_receiver_verification().pipe(takeUntil(this.unsub$)).subscribe((response)=>{
          if(response.status) {
            const data = response.data;
            console.log(data);
            this.userData.UserData.PersonalInfo = {
                firstname: data.firstname as string,
                lastname: data.lastname as string,
                age : data.age,
                email: data.email as string,
                dob: data.dob as string,
                contact: data.contact as string,
                address: data.address as string,
                state: data.state as string,
                city: data.city as string,
                zipCode: data.zipCode as string,
                area : data.area as string,
                identityImages : []
            };
            if(data.identityImages)
              this.userData.UserData.identityImagesServer = data.identityImages;
            if(data.bankDetails)
              this.userData.UserData.bankDetailsServer = data.bankDetails;
            if(data.identityProof)
              this.userData.UserData.identityDetailsServer = data.identityProof;
            if( data.neighbours1)
               this.userData.UserData.neighbours1 = data.neighbours1;
            if(data.neighbours2)
               this.userData.UserData.neighbours2 = data.neighbours2;
            if(data.pets)
               this.userData.UserData.PetInfo = data.pets;
            this.userData.UserData.petImageServer = data.pets?.petImage || null;
            this.userData.UserData.PetInfo.petImage = null;
            this.userData.newUserData();
          } else {
            this.ds.newMessage('error', 'Couldn\'t Fetch Profile', response.message);
          }
        }, (error)=>{
           if(error instanceof ErrorEvent) 
             this.ds.newMessage('error', 'Error Occured', 'Sorry some error occured on the client')
           else 
             this.ds.newMessage('error', 'Couldn\'t Fetch Profile', error.error.message);
        })
    }) 
  }

  confirm() {
    this.cnfrm.confirm({
      message: 'You will have to verify again after updating your details. You will not be able to perform certain actions till you get verified. Continue?',
      header: 'Confirmation',
      acceptButtonStyleClass: 'p-button-success',
      icon: 'pi pi-info-circle',
      accept: () => {
        
      },
      reject: () => {
        this.router.navigate(['/receiver']);
      }
    });
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }

  spinner() {
    this.loading = true;
    this.submitting = true
  }

  spinnerClose() {
    this.loading = false;
    this.submitting = false;
  }

}
