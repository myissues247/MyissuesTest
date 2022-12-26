import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Ad } from 'src/app/services/dataModels';
import { LoaderService } from 'src/app/services/loader.service';
import { AdPostService } from '../../../services/ad-post.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit, OnDestroy {
  submitting: boolean = false;
  uploadedAdImages : string[];  //total images uploaded old +  new;
  newlyAddedAdImages : number = 0; //when new adImages uploaded;
  maxAdImages : number = 10;  //sets the max number of new adImages that can be added
  uploadedIdentityImages : string[];
  newlyAddedIdentityImages : number = 0;
  uploadedAdVideo = null;
  newlyAddedVideo = 0
  ad : Ad; //local ad data;
  unsub$ = new Subject();

  constructor(private ps: AdPostService, private router: Router, private loader: LoaderService) {
    this.uploadedAdImages = [];
    this.uploadedIdentityImages = [];
   }

  ngOnInit(): void {
    this.ps.newPage(4);
    //GET DATA FROM GLOBAL AD OBJECT TO LOCAL OBJECT (REFERENCE).
    this.load();
    this.ps.AdObservable().pipe(takeUntil(this.unsub$)).subscribe((ad: Ad)=>{
      this.ad = ad; 
      this.stopload();
      //IF THE AD IS NOT INITIALIZED WITH AN AD _ID, MOVE BACK
      if(!this.ad?._id){
        this.ps.newMessage('info', 'Ad Not Initialized', 'Please start a new ad by selecting category');
        this.router.navigate(['/receiver/post/select-category']);
      }
      //Fill the data with gloabally present data (if any)
      if(ad.adImages instanceof Array){
        this.uploadedAdImages = ad.adImages;
        this.maxAdImages = 10 - this.uploadedAdImages.length;
      }
      if(ad.identityImages instanceof Array)
        this.uploadedIdentityImages = ad.identityImages;
      if(ad.adVideo)
        this.uploadedAdVideo =  ad.adVideo;
    })
  }
  
  uploadAdImages(event, adImageUpload): void {
     const files = event.files;
     console.log(adImageUpload);
     this.ps.save_ad_images(files).pipe(takeUntil(this.unsub$)).subscribe((event:any)=>{
      if (event.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        console.log(adImageUpload);
        const response = event.body;
        this.stopload();
        if(response.status){
           this.ps.newMessage('success', 'Images Uploaded', 'All the images are successfully uploaded');
           this.newlyAddedAdImages += files.length;
           adImageUpload.clear();
           adImageUpload.uploadedFileCount = 0;//reset here to enable disabled button coz we manually setting file limit.
           this.ps.NewAdData(response.data);
        } else {
           this.clearFileList(adImageUpload, files, this.uploadedAdImages.length);
           this.ps.newMessage('error', 'Couldn\'t Upload', response.message);
        }
     }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
      else 
        this.ps.newMessage('error', 'Couldn\'t Save', error.error.message);
      this.clearFileList(adImageUpload, files, this.uploadedAdImages.length);
      this.stopload();
    });
  }

  clearFileList(adImageUpload, files, uploadedLength) {
    const fileList = adImageUpload.advancedFileInput.nativeElement.files
    adImageUpload.clear();
    adImageUpload.advancedFileInput.nativeElement.files = fileList;
    adImageUpload._files = files;
    adImageUpload.uploadedFileCount = uploadedLength;
  }
  
  uploadIdentityImages(event, adImageUpload): void {
    //upload IDENTITY IMAGES to server. 
    if(this.ad.identityImages.length > 0) {
      const choice = confirm('A photo identity image is already Uploaded, Do You want to ReUpload?')
      if(!choice)
        return;
    }
    const files = event.files;
     this.ps.save_identity_images(files).pipe(takeUntil(this.unsub$)).subscribe((event:any)=>{
      if (event.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * event.loaded / event.total), 'Uploading.....');
      } else if (event instanceof HttpResponse) {
        const response = event.body;
        this.stopload();
        if(response.status){
           this.ps.newMessage('success', 'Images Uploaded', 'All the images are successfully uploaded');
           console.log(response);
           this.newlyAddedIdentityImages += files.length;
           adImageUpload.clear();
           adImageUpload.uploadedFileCount = 0;//resets the upload counter so it doesn't disable the choose button;
           this.ps.NewAdData(response.data);
        } else {
           console.log(response);
           this.ps.newMessage('error', 'Couldn\'t Upload', response.message);
           this.clearFileList(adImageUpload, files, 0);
        }
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
      else 
        this.ps.newMessage('error', 'Couldn\'t Save', error.error.message);
      this.clearFileList(adImageUpload, files, 0);
      this.stopload();
    });
  }


  uploadAdVideo(events, adVideo): void {
    //upload ad video to server. 
    if(this.ad.adVideo) {
      const choice = confirm('A Video is already Uploaded, Do You want to ReUpload?')
      if(!choice)
        return;
    }
    const files = events.files[0]; 
     this.ps.save_ad_video(files).pipe(takeUntil(this.unsub$)).subscribe((event:any)=>{
      if (event.type == HttpEventType.UploadProgress) {
        this.loader.load(Math.round(100 * event.loaded / event.total));
      } else if (event instanceof HttpResponse) {
        const response = event.body;
        this.stopload();
        if(response.status){
           this.ps.newMessage('success', 'Video Was Uploaded', 'The Video was are successfully uploaded');
           console.log(response);
           this.newlyAddedIdentityImages += files.length;
           adVideo.clear();
           adVideo.uploadedFileCount = 0; //resets the upload counter so it doesn't disable the choose button;
           this.ps.NewAdData(response.data);
        } else {
           console.log(response);
           this.ps.newMessage('error', 'Couldn\'t Upload', response.message);
           this.clearFileList(adVideo, events.files, 0);
        }
      }
    }, (error)=>{
      if(error instanceof ErrorEvent)
        this.ps.newMessage('error', 'Error Occured', 'sorry some error occured');
      else 
        this.ps.newMessage('error', 'Couldn\'t Save', error.error.message);
      this.clearFileList(adVideo, events.files, 0);
      this.stopload();
    });
  }



  nextPage(adImageInput, identityImageInput, adVideoInput) : void{
    //check if data is saved to server. 
    if(this.uploadedAdImages.length > 0 && this.uploadIdentityImages.length > 0 && this.uploadAdVideo){
       //then check if no data is unsaved then move
       if(!this.checkUnuploadedFiles(adImageInput, identityImageInput, adVideoInput))
          this.router.navigate(['/receiver/post/user-details']);
       else 
          //confirm to discard if any unsaved data to move forward.
          if(this.confirmDiscard()){
            this.router.navigate(['/receiver/post/user-details']);
          };
    } else 
      this.ps.newMessage('error', 'Media Files Missing', 'Please upload required media');
  }


  prevPage(adImageInput, identityImageInput, adVideoInput) : void{
    //if no data is unsaved then move.
  //  if(!this.checkUnuploadedFiles(adImageInput, identityImageInput, adVideoInput))
      this.router.navigate(['/receiver/post/ad-content']);
    /**** implement local caching of unsaved data  ******/
  }


  checkUnuploadedFiles(adImageInput, identityImageInput, adVideoInput): boolean{
    //return false if no file is selected / unsaved else true.
    if(adImageInput?.files instanceof Array && adImageInput.length > 0)
      return true;
    if(identityImageInput?.files instanceof Array && identityImageInput.length > 0)
      return true;    
    if(adVideoInput?.files instanceof Array && adVideoInput.length > 0)
      return true; 

    return false
  }

  confirmDiscard() : boolean{
    /*** implement with confirm dialog ****/
    //confirms if user want to discard it or not; if yes return true and discard, if no  return false.
    this.ps.newMessage('warning', 'Unsaved Ad Images', 'Unsaved images will get lost');
    return false;
  }
   
  deleteAdImage(adImage, index) {
    console.log(adImage);
    this.load()
    this.ps.deleteAdImage(adImage).pipe(takeUntil(this.unsub$)).subscribe((response)=>{
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
    }, this.handle_error.bind(this));
  }


  handle_error(error){
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
  
  ngOnDestroy() : void {
    this.unsub$.next(true);
    this.unsub$.complete();
  }

}
