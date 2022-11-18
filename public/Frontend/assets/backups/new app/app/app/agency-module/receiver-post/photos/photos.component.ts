import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { AgencyAdServiceService } from '../../services/agency-ad-service.service';
@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {
  submitting: boolean = false;
  uploadedAdImages : string[];  //total images uploaded old +  new;
  maxAdImages = 10;
  newlyAddedAdImages : number = 0; //when new adImages uploaded;
  uploadedAdVideo : string  = null;
  ad : Ad; //local ad data;

  constructor(private ps:AgencyAdServiceService, private router: Router, private loader: LoaderService) {
    this.uploadedAdImages = [];
   }

  ngOnInit(): void {
    this.ps.newPage(4);
    //referencing global ad data.
    this.load();
    this.ps.AdObservable().subscribe((ad: Ad)=>{
      this.ad = ad;
      this.stopload();
      if(!this.ad?._id){
        this.ps.newMessage('info', 'Ad Not Initialized', 'Please start a new ad by selecting category');
        this.router.navigate(['/agency/post/select-location']);
      }
      if(ad.adImages instanceof Array){
        this.uploadedAdImages = ad.adImages;
        this.maxAdImages = 10 - this.uploadedAdImages.length;
      }
      if(ad.adVideo)
        this.uploadedAdVideo = ad.adVideo;
    })
  }
  
  uploadAdImages(event, adImageUpload): void {
     //upload to server. 
     const files = event.files;
     this.load();
     this.ps.save_ad_images(files).subscribe((event)=>{
      if (event.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        const response = event.body;
        this.stopload();
        if(response.status){
          this.ps.newMessage('success', 'Images Uploaded', 'All the images are successfully uploaded');
          console.log(response);
          this.newlyAddedAdImages += files.length;
          adImageUpload.clear();
          adImageUpload.uploadedFileCount = 0; //reset the upload counter so choose button doesn't get disabled
          this.ps.NewAdData(response.data);
        } else {
          console.log(response);
          this.clearFileList(adImageUpload, files, this.uploadedAdImages.length);
          this.ps.newMessage('error', 'Couldn\'t Upload', response.message);
        }
      }
    }, (error) => {
      if(error instanceof ErrorEvent)
        this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
      else 
        this.ps.newMessage('error', 'Couldn\'t Save', error.error.message);
      this.clearFileList(adImageUpload, files, this.uploadedAdImages.length);
      this.stopload();
    })
  }

  deleteAdImage(adImage, index) {
    console.log(adImage);
    this.load()
    this.ps.deleteAdImage(adImage).subscribe((response)=>{
      if(response.status) {
        this.ps.newMessage('success', 'Delete Ad Image', 'Image was deleted from server');
        if(this.uploadedAdImages[index] == adImage) {
          this.uploadedAdImages.splice(index, 1);
        } else {
          const findIndex = this.uploadedAdImages.indexOf(adImage);
          this.uploadedAdImages.splice(findIndex, 1);
        }
        this.ad.adImages = this.uploadedAdImages;
        this.ps.NewAdData(this.ad);
      } else {
        this.ps.newMessage('error', 'Failed To Delete', response.message);
        this.stopload();
      }
    }, this.errorHandle.bind(this));
  }
  
  uploadAdVideo(events, adVideoUpload): void {
    //upload to server. 
    if(this.ad.adVideo) {
      const choice = confirm('A Video is already Uploaded, Do You want to ReUpload?')
      if(!choice)
        return;
    }
    const files = events.files[0];
    this.load();
     this.ps.save_ad_video(files).subscribe((event:any)=>{
      if (event.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        const response = event.body;
        this.stopload();
        if(response.status){
           this.ps.newMessage('success', 'Video Uploaded', 'The video was uploaded');
           adVideoUpload.clear();
           adVideoUpload.uploadedFileCount = 0 // resets the uploaded count so choose button doesn't get disabled
           this.ps.NewAdData(response.data);
        } else {
         this.clearFileList(adVideoUpload, events.files, 0);
         this.ps.newMessage('error', 'Couldn\'t Upload', response.message);
        }
      }
    }, (error) => {
      if(error instanceof ErrorEvent)
        this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
      else 
        this.ps.newMessage('error', 'Couldn\'t Save', error.error.message);
      this.clearFileList(adVideoUpload, events.files, 0);
      this.stopload();
    })
  }
  
  nextPage(adImageInput, adVideoUplaod) : void{
    //if data is saved to server then check if no data is unsaved then move. 
    //else confirm to discard before moving to next page;
    if(this.uploadedAdImages.length > 0 && this.uploadedAdVideo){
       if(!this.checkUnuploadedFiles(adImageInput, adVideoUplaod))
          this.router.navigate(['/agency/post/user-details']);
       else 
          if(this.confirmDiscard()){
            this.router.navigate(['/agency/post/user-details']);
          };
    } else 
      this.ps.newMessage('error', 'No Image Uploaded', 'Please upload required images');
  }

  //resets the file upload so it doesn't get disabled.
  clearFileList(adImageUpload, files, uploadedLength) {
    const fileList = adImageUpload.advancedFileInput.nativeElement.files
    adImageUpload.clear();
    adImageUpload.advancedFileInput.nativeElement.files = fileList;
    adImageUpload._files = files;
    adImageUpload.uploadedFileCount = uploadedLength;
  }
  

  prevPage(adImageInput, adVideoUpload) : void{
    //if no data is unsaved then move.
    // if(!this.checkUnuploadedFiles(adImageInput, adVideoUpload))
      this.router.navigate(['/agency/post/ad-content']);
    /**** implement local caching of unsaved data  ******/
  }

  checkUnuploadedFiles(adImageInput, adVideoUpload): boolean{
    //return false if no file is selected and unsaved else true.
    if(adImageInput?.files instanceof Array && adImageInput.length > 0)
      return true;
    if(adVideoUpload?.files instanceof Array && adVideoUpload.length > 0)
      return true;     

    return false
  }

  confirmDiscard() : boolean{
    /*** implement with confirm dialog ****/
    //confirms if user want to discard it or not; if yes return true and discard, if no  return false.
    this.ps.newMessage('warning', 'Unsaved Ad Images', 'Unsaved images will get lost');
    return false;
  }


  errorHandle(error) {
    if(error instanceof ErrorEvent)
      this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
    else 
      this.ps.newMessage('error', 'Couldn\'t Save', error.error.message);
    this.stopload();
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
