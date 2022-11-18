import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
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
  pwdMailProp;
  constructor(private ds:UserDataService, private ss: StateService , private router:Router, private loader: LoaderService) { 
    this.role=[
      {name: 'Receiver', code: 'receiver'},
      {name: 'Donor', code: 'doner'},
      {name: 'Sponsor', code: 'sponsor'},
      {name: 'Agency', code: 'agency'}
    ]
  }

  ngOnInit(): void {

    this.ss.getUserSessionObservable().subscribe((session)=>{
      if(session._id) 
        this.logged = true
      else 
        this.logged = false
    })
  }

  ngAfterViewInit() : void {
    this.ss.openCloseObservable().subscribe((action)=>{
      if(action.signIn)
        this.openButton.nativeElement.click();
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
    this.ds.GetUser({email:this.mailProp,password:this.passwordProp, role: this.roleProp.code}).subscribe(async (response)=>{
        if(response.status==true){
          console.log(response);
          document.getElementById('err').innerHTML='';
          console.log(response.data);
          this.ss.setUserSession(response.data);
          document.getElementById('close').click();
          setTimeout(() => {
            this.stopload();
            if(response.data.type == 'receiver')
               this.router.navigate(['/receiver'])
            else if(response.data.type == 'doner')
               this.router.navigate(['/doner']);
            else if(response.data.type == 'agency')
               this.router.navigate(['/agency']);
            else if(response.data.type == 'sponsor')
              this.router.navigate(['/sponsor'])
          }, 500);
        } else {
          this.stopload();
          this.ds.newMessage('error', 'Couldn\'t Sign In', response.message);
      }},(error)=>{
        if(error instanceof ErrorEvent)
        this.ds.newMessage('error', 'Some error occured', 'sorry some error occured in the browser');
       else 
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

  setPwd(){

    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

    if(Boolean(this.pwdMailProp)==false)
      return  document.getElementById('pwdErr').textContent='Mail ID Is Required';
   if(!this.pwdMailProp.match(pattern))
   return document.getElementById('pwdErr').textContent='Please Enter valid Mail Id';
   else {
     document.getElementById('pwdErr').textContent='';
      this.ds.resetPassword({email:this.pwdMailProp}).subscribe(async (response)=>{
        console.log(response.message);
        
      })
    }

      

  }

}
