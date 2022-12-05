import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LayoutService } from 'src/app/services/layout.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';
// import { zxcvbn } from 'zxcvbn3';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  unsub$ = new Subject()
  @ViewChild('open', {read: ElementRef})
    openButton : any;
  @ViewChild('close', {read: ElementRef})
    closeButton : any;
  logged = false;
  role=[];
  passwordProp: string;

  nameProp;
  mailProp;
  confProp;
  lastProp;
  titleProp;
  name=false;
  mail=false;
  conf=false;
  pass=false;
  last=false;
  roleProp;
  ifrole=false;
  
  sessionType = '';

  meterValue = 0
  strengthText: string = "";
  strength = {
    0: "Worst",
    1: "Bad",
    2: "Weak",
    3: "Good",
    4: "Strong"
  }

  logo;
  submitting = false;
  constructor(private ds:UserDataService,private router:Router, private ss: StateService, private layout: LayoutService) {
      this.role=[
            {name: 'Receiver', code: 'receiver'},
            {name: 'Donor', code: 'doner'},
            {name: 'Sponsor', code: 'sponsor'},
            {name: 'Agency', code: 'agency'}
      ]
   }

  ngOnInit(): void {
    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      if(session._id) {
        this.logged = true
        this.sessionType = session.type
      }
      else {
        this.logged = false
        this.sessionType = '';
      }
    });

    this.layout.layout().pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      this.logo = environment.server + '/' +  response.imagePath
    })
  }

  ngAfterViewInit(): void {
    this.ss.openCloseObservable().pipe(takeUntil(this.unsub$)).subscribe((action)=>{
      if(action.signUp){
        this.openButton.nativeElement.click()}
    });
  }

  SignUp(form, closeButton){
    console.log(this.passwordProp);
    if(form.status == "INVALID") {
      return this.ds.newMessage("error", "Incorrect Form Data", "Please fill the required details correctly.")
    }
    // if(!this.roleProp || this.roleProp?.type== 'receiver' || this.roleProp?.type == 'doner') {
    //     if(Boolean(this.nameProp)==false){
    //     this.name=true;
    //     return true
    //   }else
    //   this.name=false;

    //   if(Boolean(this.lastProp)==false){
    //     this.last=true;
    //     return true;
    //   }else
    //    this.last=false;
    // }

    if(Boolean(this.mailProp)==false){
          this.mail=true;
          return true;
    }else
    this.mail=false;

    if(Boolean(this.roleProp)==false){
      this.ifrole=true;
      return true;
    }else
    this.ifrole=false;

    if(Boolean(this.passwordProp)==false){
      this.pass=true;
      return true;
    }else{
      this.submitting = true;
      if(!this.passwordProp.match('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')) {
        this.submitting = false;
        this.pass = true;
        return this.ds.newMessage('error', 'Weak Password', 'Please choose a strong password');
      }
      this.submitting = false;
      this.pass=false;
    }
    if(Boolean(this.confProp)==false){
        this.conf=true;
        return true;
    }else
    this.conf=false;
    
    if(this.passwordProp!=this.confProp)
    {  
      alert('Confirm password doesn\'t match with password');
      return true;
    }
    // console.log('we are heree')
    // if(this.meterValue <= 2) {
    //   return this.ds.newMessage('error', 'Weak Password', 'Password is too weak please choose a good password');
    // }
    console.log('adn here')
    this.submitting = true;
    this.ds.AddUser({agencyTitle: this.titleProp, sponsorTitle: this.titleProp, firstname:this.nameProp,lastname:this.lastProp,email:this.mailProp,password:this.passwordProp,userType:this.roleProp.code}).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      this.submitting = false
      if(response.status) {
        this.ds.newMessage('success', 'Account Created', response.message);

        this.nameProp=this.lastProp=this.mailProp=this.passwordProp=this.confProp=this.roleProp='';
        this.passwordProp = "";
        form.reset();
        closeButton.click();
        this.ss.openModal({signIn: true})
      } else {
        this.ds.newMessage('error', 'Couldn\'t Create', response.message);
      }
    },
    (error)=>{
      this.submitting = false;
      if(error instanceof ErrorEvent)
      this.ds.newMessage('error', 'Some error occured', 'sorry some error occured in the browser');
    else 
      this.ds.newMessage('error', 'Some error occured', error.status + " : " + error.error.message);
    })


  }

  // checkStrength(event) {
  //   const password = event.target.value;
  //   this.passwordProp = password;
  //   console.log(this.passwordProp)
  //   const result = zxcvbn(password);
  //   this.meterValue = result.score;

  //   if (this.passwordProp !== "") {
  //     this.strengthText = "Strength: " + this.strength[result.score]; 
  //   } else {
  //     this.strengthText = "";
  //   }
  // }

  dashboard() {
    if(this.sessionType == 'agency')
      this.router.navigate(['/agency']);
    else if(this.sessionType == 'sponsor')
      this.router.navigate(['/sponsor']);
    else if(this.sessionType == 'receiver')
      this.router.navigate(['/receiver']);
    else if(this.sessionType == 'doner')
      this.router.navigate(['/doner']);
  }

  ngOnDestroy() : void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
