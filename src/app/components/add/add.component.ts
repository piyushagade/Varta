import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import * as config from '../../config/config';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [
    ApiService
  ]
})
export class AddComponent {
  author;
  origin;
  username;
  dirs = config.constants.dirs;
  keyError = false;
  category = 'Journal';
  articleText;
  gallery = config.constants.gallery;
  imageGallery;
  galleryVisible = true;
  previewVisible = false;

  public articleForm = this._fb.group({
      title: ["", Validators.compose([Validators.required, Validators.maxLength(35), Validators.minLength(6)])],
      introduction: ["", Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(15)])],
      text: ["", Validators.compose([Validators.required, Validators.minLength(20)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4)])],
      image: [""]
  });

  constructor(private _fb: FormBuilder, private _api: ApiService, private _r: Router, location: Location){
    this.author = config.constants.admin.name;
    this.origin = document.location.origin;
    this.username = document.location.pathname.substr(1).split('/')[0];
  }

  onNewArticleSubmit(event) {
    let data = this.articleForm.value;
    
    // Add some more information
    data.link = '/' + data.title.toLowerCase().replace(/\s/g, "-");    
    data.author = config.constants.admin.name;
    data.date = new Date().getTime();
    data.category = this.category;
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
    this.category = category;
  }

  showGallery(){
    this.galleryVisible = true;
    this.previewVisible = false;
  }

  hidePreview(){
    this.previewVisible = false;
  }
}
