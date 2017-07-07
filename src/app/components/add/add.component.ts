import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import * as config from '../../config/config';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css',
    '../../../assets/css/spinner.css'],
  providers: [
    ApiService
  ]
})
export class AddComponent {
  origin;
  username;
  dirs = config.constants.dirs;
  keyError = false;
  category = 'Journal';
  articleText;
  gallery = config.constants.gallery;
  lengths = config.constants.parameters.lengths;
  imageGallery;
  galleryVisible = true;
  previewVisible = false;
  user = { name : ''};
  accountAlreadyCreated = false;
  showSpinner = true;
  isBusy = 0;

  public articleForm = this._fb.group({
      title: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.articleTitle.max), Validators.minLength(this.lengths.articleTitle.min)])],
      introduction: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.articleIntroduction.max), Validators.minLength(this.lengths.articleIntroduction.min)])],
      text: ["", Validators.compose([Validators.required, Validators.minLength(this.lengths.articleText.min)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.key.max), Validators.minLength(this.lengths.key.min)])],
      image: [""]
  });

  constructor(private _fb: FormBuilder, private _api: ApiService, private _r: Router, location: Location){
    this.origin = document.location.origin;
    this.username = document.location.pathname.substr(1).split('/')[0];

    // Set busy
    this.setBusy();

    // Check if the username exists
    this.userExists(this.username);

    // Get user data
    this._api.getUserData(this.username).subscribe(
      res => {
        this.user = res;

        // Set idle
        this.setIdle();
      }
    );
  }

  // Check if a user exists
  userExists(value){
    this._api.getUserAvailability(value).subscribe(
        res => {
          if(!res.available){
            this.accountAlreadyCreated = true;
          }
          else{
            // Set idle
            this.setIdle();
          }
        }
      );
  }

  onNewArticleSubmit(event) {
    let data = this.articleForm.value;
    
    // Add some more information
    data.link = '/' + data.title.toLowerCase().replace(/\s/g, "-");    
    data.author = this.user.name == '' || !(this.user.name) ? 'Anonymous' : this.user.name;
    data.date = new Date().getTime();
    data.category = this.category;
    data.published = true;
    data.comments = { 'all' : []};
    if(data.image == undefined) data.image = '';
    
    // Update data store
    this._api.addArticle(data, this.username).subscribe(
        res => {
          this.onPostArticle(res, data);
        },
        err => console.log(err.json().message)
    );    
  }

  onPostArticle(res, data){
    if(JSON.parse(res._body).status == 'success') this._r.navigateByUrl('/' + this.username + data.link); 
    else if(JSON.parse(res._body).status == 'key-error') this.keyError = true; 
  }

  setGalleryImage(url){
    this.imageGallery = url;
    this.galleryVisible = false;
    this.previewVisible = true;
  }

  selectCategory(category){
    console.log(category);
    
    this.category = category;
  }

  showGallery(){
    this.galleryVisible = true;
    this.previewVisible = false;
  }

  hidePreview(){
    this.previewVisible = false;
  }

  // Set busy
  setBusy(){
    this.isBusy++;
  }

  // Set idle
  setIdle(){
    this.isBusy--;
    if(this.isBusy == 0){
      let timer = Observable.timer(1200);
      timer.subscribe(
        t => {
         this.showSpinner = false;
      });
    }
  }
}
