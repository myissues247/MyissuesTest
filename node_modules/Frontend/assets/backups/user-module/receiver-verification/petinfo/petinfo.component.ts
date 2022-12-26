import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserdataService } from '../../userdata.service';

@Component({
  selector: 'app-petinfo',
  templateUrl: './petinfo.component.html',
  styleUrls: ['./petinfo.component.css']
})
export class PetinfoComponent implements OnInit {
  
  PetData : any;
  image;
  petImageServer: string;
  constructor(private router:Router,public Petdata:UserdataService) { }

  ngOnInit(): void {
    this.PetData=this.Petdata.getUserInfo().PetInfo;
    console.log(this.PetData);
    if(this.PetData.petImage instanceof File) {
      this.image = this.PetData.petImage
    }
    if(this.Petdata.getUserInfo().petImageServer){
    this.petImageServer = this.Petdata.getUserInfo().petImageServer
    this.showThumbnail();
  }
    this.Petdata.userinfoObservable().subscribe((data:any)=>{
       if(data instanceof Object){
         this.PetData = data.PetInfo;
        this.petImageServer = data.petImageServer
       }
    })
  }

  nextPage(){
    //this.Petdata.UserData.PetInfo=this.PetData;
    if(!this.image) {
      if(this.petImageServer){
         this.Petdata.UserData.PetInfo.petImage = this.petImageServer;
        }
    }
    this.router.navigate(['/receiver/verification/confirm'])
  }

  prevPage(){
    this.router.navigate(['/receiver/verification/neighbour'])
  }
  
  selectPetImage(event) {
    this.PetData.petImage = event.target.files[0];
    this.Petdata.UserData.petImageServer = null;
    this.showThumbnail();
  }

  showThumbnail(){
    if(!(this.PetData.petImage instanceof File))
      return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(this.PetData.petImage);
    fileReader.onload = ()=> this.image = fileReader.result;
    fileReader.onerror = () => console.log(fileReader.error);
  }
}
