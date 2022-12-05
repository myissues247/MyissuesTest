import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { UserDataService } from '../../services/user-data.service';

export interface Days {
  monday : boolean,
  tuesday: boolean,
  wednesday: boolean,
  thrusday :boolean,
  friday: boolean,
  saturday: boolean,
  sunday : boolean,
}

export interface Time {
    morning: boolean,
    afternoon: boolean,
    evening: boolean,
}

export interface Volunteer {
  firstname: string,
  lastname : string,
  email : string,
  contact : string,
  city?: string,
  message: string,
  helpIn : string[],
  days : Days,
  time : Time
}
@Component({
  selector: 'app-volunteer',
  templateUrl: './volunteer.component.html',
  styleUrls: ['./volunteer.component.css']
})
export class VolunteerComponent implements OnInit {
  @ViewChild('days')
  daysCheckBox;
  
  submitting : boolean = false;
  timeCount : number = 0;
  daysCount : number = 0;
  Volunteer: Volunteer;
  constructor(private ds: UserDataService, private loader: LoaderService, private router: Router) {
      this.Volunteer = {
        firstname: null,
        lastname : null,
        email : null,
        contact: null,
        city: null,
        message: null,
        helpIn : [],
        days : {} as Days,
        time : {} as Time
      } as Volunteer;
   }

  ngOnInit(): void {
  }
  
  submit_volunteer(form) {
    if(form.status == "INVALID")
      return this.ds.newMessage('error', 'Incomplete Form', "Please fill required details correctly");
    console.log(form);
    this.load();
    this.ds.submit_volunteer(this.Volunteer).subscribe((response)=>{
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Details Submitted', response.message)
        this.router.navigate(['/']);
      } else {
        console.log(response);
        alert(response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent) 
        this.ds.newMessage('error', 'Some Error Occured', "Sorry some error occured on client side");
      else 
        this.ds.newMessage('error', 'Some Error Occured', error.status + " : " + error.error.message);
      this.stopload()
    })
  }

  daysControl(event) {
    const checkbox = event.target;
    if(checkbox.checked) {
      this.daysCount++;
      this.Volunteer.days[checkbox.value] = true;
    } else {
      this.daysCount--;
      this.Volunteer.days[checkbox.value] = false;
    }
  }

  timeControl(event) {
    const checkbox = event.target;
    if(checkbox.checked) {
      this.timeCount++;
      this.Volunteer.time[checkbox.value] = true;
    } else {
      this.timeCount--;
      this.Volunteer.time[checkbox.value] = false;
    }
  }

  helpControl(event) {
    const checkbox = event.target;
    if(checkbox.checked) {
      this.Volunteer.helpIn.push(checkbox.value);
    } else {
      this.Volunteer.helpIn = this.Volunteer.helpIn.filter((value)=> value != checkbox.value)
    }
  }

  select_city(event) {
    this.Volunteer.city = event.target.value;
  }

  load() {
    this.loader.start();
    this.submitting = true;
  }

  stopload() {
    this.loader.stop();
    this.submitting = false;
  }
}
