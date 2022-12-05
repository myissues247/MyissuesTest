import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdPostService } from 'src/app/services/ad-post.service';
import { StateService } from 'src/app/services/state.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { environment } from 'src/environments/environment';
import {Ad} from '../../../services/dataModels';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent implements OnInit {
  adId : string;
  adData : any;
  images: any[];
  currentUrl = "";
  displaySocial : boolean = false;
  displayEmbed  : boolean = false;
  whatsappSharer = '';
  emailSharer = "";
  twitterSharer = "";
  facebookSharer = "";
  embed = {
    large: true,
    medium: false,
    small: false
  }
  embedLink = '';
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
  ];
  session; 
  constructor(private ds: UserDataService, private ar: ActivatedRoute, private router: Router, private ps: AdPostService, private ss: StateService) {
    this.adData = {
      firstName: "Loading....",
      lastName : "Loading....",
      categoryName : "Loading....", 
      age : 0,
      city : "Loading....",
      adImages : ["assets/images/banner2.jpg", "assets/images/banner2.jpg"],
      adTitle : "Loading....",
      description: "Loading....",
      approvedOn : new Date()
    }
   }

  ngOnInit(): void {
     this.currentUrl = window.location.href;
     this.ar.queryParams.subscribe((data)=>{
       if(data.mode == 'preview')
         return this.getPreview();
       if(!data.ad){
         alert("no ad choosen");
         this.router.navigate(['/view-all', 'all'])
       } else {
         this.adId = data.ad;
         this.embedLink = environment.server + "/embed/ad/" + this.adId + "/large";
         this.get_ad();
       }
     });
     
     this.ss.getUserSessionObservable().subscribe((session)=>this.session = session)
  }

  get_ad(){
     this.ds.get_ad_data(this.adId).subscribe((response: any)=>{
       if(response.status){
         console.log(response.data);
         this.adData = response.data;
         this.initShare()
       } else {
        this.ds.newMessage('error', 'Ads Not Fetched', response.message);
         console.log(response);
       }
     }, (error)=>{
       console.log(error);
       if(error instanceof ErrorEvent)
         this.ds.newMessage('error', 'Error Occured', 'Sorry couldn\'t connect to the url')
       else 
         this.ds.newMessage('error', 'Error Occured', error.status + " : " + error.error.message);
     })
  }
  
  getPreview(){
    this.ps.AdObservable().subscribe((ad: Ad)=>{
      if(ad._id)
        this.adData = ad;
    })
  }

  report_ad(){
    //report ad
  }

  donate(adId){
    this.router.navigate(['/donate/details'], {queryParams: {adId: adId}});
  }


  PrintDiv() { 
      var divToPrint=document.getElementById('divToPrint');
var newWin=window.open('','_blank', 'width=800,height=800');
newWin.document.open();
newWin.document.write('<html><body onload="window.print()">'+divToPrint.innerHTML+'</body>');
newWin.document.close();
// setTimeout(function(){newWin.close();},10);

  }


  initShare() {
    const name = encodeURIComponent(this.adData.firstName + " " + this.adData.lastName);
    const city = encodeURIComponent(this.adData.city);
    const title = encodeURIComponent(this.adData.adTitle);
    const description = encodeURIComponent(this.adData.description);
    const image = encodeURIComponent((this.adData.adImages?.length> 0)? (environment.server + '/' + this.adData.adImages[0]): 'http://localhost:4200/assets/frontend/no-image.jpg' )
    const url = encodeURIComponent(this.currentUrl);
    this.whatsappSharer = `https://api.whatsapp.com/send?text=Hi, I'd really appreciate it if you would share or donate to this. ${name}, ${city}, ${title}. Read more here ${url} Forward this message to your contacts to help this campaign reach its goal!`;

    this.emailSharer = `mailto:?Subject=Have you seen ${name}, ${city}, ${title} &amp;Body= ${url}.\n 
    Even a small donation could help Shauna Feldman reach their fundraising goal. And if you can't make a donation, it would be great if you could share the fundraiser to help spread the word. `;

    this.twitterSharer = `http://twitter.com/share?text=Hi, I'd really appreciate it if you would share or donate to this  . ${name}, ${city}, ${title}.&nbsp;\n
    Read more here ${url}\nForward this message to your contacts to help this campaign reach its goal!&amp;url=${encodeURIComponent(environment.server)}&amp;hashtags=stackoverflow,example,youssefusf`;

    this.facebookSharer = `http://www.facebook.com/sharer.php?s=100&amp;p[url]=${ url }&amp;p[images][0]=${image}&amp;p[title]=${title}&amp;p[summary]=${description.substr(0, 50)};`
    console.log(this.facebookSharer);
  }

  clipboard(input) {
      /* Get the text field */
      var copyText = input;

     /* Select the text field */
     copyText.select();
     copyText.setSelectionRange(0, 99999); /* For mobile devices */

     /* Copy the text inside the text field */
     document.execCommand("copy");

     /* Alert the copied text */
     alert("Copied the text: " + copyText.value || copyText.innerText);
  }

  embedChange(type) {
    if(type == 'large')
      this.embed.large = true;
    else 
      this.embed.large = false;
    if(type == 'medium')
      this.embed.medium = true;
    else 
      this.embed.medium = false;
    if(type == "small")
      this.embed.small = true;
    else 
      this.embed.small = false;
      
    this.embedLink = environment.server + "/embed/ad/" + this.adId + "/" + type;
  }
}
