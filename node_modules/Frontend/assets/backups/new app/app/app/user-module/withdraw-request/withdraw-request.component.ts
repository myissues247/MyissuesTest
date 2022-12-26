import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'app-withdraw-request',
  templateUrl: './withdraw-request.component.html',
  styleUrls: ['./withdraw-request.component.css']
})
export class WithdrawRequestComponent implements OnInit, OnDestroy {
  submitting : boolean = false;
  sessionUnSub;
  contact : any = {
    firstname : "",
    lastname : "",
    email : "", 
    contact : "",
    amount : "", 
    message : "",
    identityProof : "",
    bankDetails : ""
  }
  constructor(private ds: UserDataService, private ss: StateService, private router: Router, private loader: LoaderService) { }

  ngOnInit(): void {
    this.sessionUnSub = this.ss.getUserSessionObservable().subscribe((session)=>{
      this.contact.email = session.email;
      this.contact.firstname = session.firstname;
      this.contact.lastname = session.lastname;
    })
  }

  ngOnDestroy() :void {
    this.sessionUnSub.unsubscribe();
    delete this.contact;
  }
  
  selectIdentityProof(event) {
    this.contact.identityProof = event.target.files[0];
  }

  selectBankDetails(event) {
    this.contact.bankDetails = event.target.files[0];
  }
  
  submit(withdrawForm) {
    if(withdrawForm.status == "INVALID")
      return this.ds.newMessage('error', 'Incorrect Form', 'please fill the form correctely')
    this.load();
    this.ds.withdraw_request(this.contact).subscribe((response)=>{
      this.stopload();
      if(response.status) {
        this.ds.newMessage('success', 'Request Submitted', response.message);
        this.router.navigate(['/receiver']);
      } else {
        this.ds.newMessage('error', 'Couldn\'t Submit', response.message);
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
         this.ds.newMessage('error', 'Error Occured','sorry some unknown error occured');
      else 
         this.ds.newMessage('error', 'Error Occured',`${error.status} : ${error.error.message}`);
      this.stopload();
    }) 
  }


  load() {
    this.submitting = true;
    this.loader.start();
  }
  
  stopload() {
    this.submitting = false;
    this.loader.stop();
  }
}
