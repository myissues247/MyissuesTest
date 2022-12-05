import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {

  unsub$ = new Subject();
  @ViewChild('open')
    openButton;
  @ViewChild('closeButton')
    closeButton;
  logged = false;
  submitting: boolean = false; //"used for page blur while submitting"
  mailProp;
  passwordProp;
  roleProp;
  username=false;
  pass=false;
  error;
  role; 
  ifrole=false;
  
  resendVerification = false;
  pwdMailProp

  noRedirect = false;
  constructor(private ds:UserDataService, private ss: StateService , private router:Router, private loader: LoaderService) { 
    this.role=[
      {name: 'Receiver', code: 'receiver'},
      {name: 'Donor', code: 'doner'},
      {name: 'Sponsor', code: 'sponsor'},
      {name: 'Agency', code: 'agency'}
    ]
  }

  ngOnInit(): void {

    this.ss.getUserSessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session)=>{
      if(session._id) 
        this.logged = true
      else 
        this.logged = false
    })
  }

  ngAfterViewInit() : void {
    this.ss.openCloseObservable().pipe(takeUntil(this.unsub$)).subscribe((action)=>{
      if(action.signIn){
        this.noRedirect = true;
        this.openButton.nativeElement.click();
      }
    });

  }

  SignIn(){
    if(Boolean(this.mailProp)==false){
        this.username=true;
        return true;
    }else
    this.username=false;

    if(Boolean(this.passwordProp)==false){
      this.pass=true;
      return true;
    }else
    this.pass=false;

    if(Boolean(this.roleProp)==false){
      this.ifrole=true;
      return true;
    }else
    this.ifrole=false;
    
    console.log(this.roleProp);
    this.load();
    this.ds.GetUser({email:this.mailProp,password:this.passwordProp, role: this.roleProp.code}).pipe(takeUntil(this.unsub$)).subscribe(async (response)=>{
        if(response.status==true){
          console.log(response);
          document.getElementById('err').innerHTML='';
          console.log(response.data);
          this.ss.setUserSession(response.data);
          document.getElementById('close').click();
          sessionStorage.removeItem('admin');
          this.stopload();
          if(this.noRedirect == false) {
            setTimeout(() => {
              if(response.data.type == 'receiver')
                 this.router.navigate(['/receiver'])
              else if(response.data.type == 'doner')
                 this.router.navigate(['/doner']);
              else if(response.data.type == 'agency')
                 this.router.navigate(['/agency']);
              else if(response.data.type == 'sponsor')
                this.router.navigate(['/sponsor'])
            }, 500);
          }
        } else {
          this.stopload();
          this.ds.newMessage('error', 'Couldn\'t Sign In', response.message);
      }},(error)=>{
        if(error instanceof ErrorEvent)
        this.ds.newMessage('error', 'Some error occured', 'sorry some error occured in the browser');
       else if (error.error.code == 'not-verified') {
        this.resendVerification = true
        alert('Your email is not verified, Please click on resend verification to generated new verification link');
      } else 
         this.ds.newMessage('error', 'Some error occured', error.status + " : " + error.error.message);
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


  forgotPwd(){
    document.getElementById('close').click();
    setTimeout(() => {
      document.getElementById('openforgotPwdModal').click();

    }, 500);
 
 
  }

  showVerification() {
    document.getElementById('close').click();
    setTimeout(() => {
      document.getElementById('openMailVerificationModal').click();

    }, 500);
  }

 resendVerificationLink() {
  var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

  if(Boolean(this.pwdMailProp)==false)
    return  document.getElementById('pwdErr').textContent='Mail ID Is Required';
  if(!this.pwdMailProp.match(pattern))
     return document.getElementById('pwdErr').textContent='Please Enter valid Mail Id';

    this.ds.resendVerification({email: this.pwdMailProp, type: this.roleProp.code}).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
      if(response.status) {
        this.ds.newMessage("success", "Link Sent", "Verification Link has been sent to your email, please check your inbox");
        document.getElementById('closeemailModal').click();
      } else {
        this.ds.newMessage("error", "Couldn't Send Link", "Couldn't send verification link");
      }
    }, (error)=>{
      if(error instanceof ErrorEvent) 
       this.ds.newMessage('error', 'Error Occured', 'Unknown error occured on the browser')
      else {
        if(error.error.status == 400)
          this.ds.newMessage('error', 'Error', error.error.message);
        else
        this.ds.newMessage('error', 'Error', "Couldn't send verification link");
      } 
   })
 }

  setPwd(){

    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

    if(Boolean(this.pwdMailProp)==false)
      return  document.getElementById('pwdErr').textContent='Mail ID Is Required';
   if(!this.pwdMailProp.match(pattern))
   return document.getElementById('pwdErr').textContent='Please Enter valid Mail Id';
   else {
     document.getElementById('pwdErr').textContent='';
     console.log(this.roleProp.code);
      this.ds.resetPassword({email:this.pwdMailProp, type: this.roleProp.code}).pipe(takeUntil(this.unsub$)).subscribe(async (response)=>{
        if(response.status) {
          this.ds.newMessage('success', 'Password Reset Link', 'Please check your email for the reset link')
          document.getElementById('closePwdModal').click();
        } else {
          this.ds.newMessage('error', 'Error', "Could not send reset link");
        }
      }, (error)=>{
         if(error instanceof ErrorEvent) 
          this.ds.newMessage('error', 'Error Occured', 'Unknown error occured on the browser')
         else {
           if(error.error.status == 400)
             this.ds.newMessage('error', 'Error', error.error.message);
           else
           this.ds.newMessage('error', 'Error', "Couldn't send reset link");
         } 
           
      })
    }
  }

  ngOnDestroy() : void {
    this.unsub$.next();
    this.unsub$.complete();
  }

}
