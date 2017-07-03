import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.css',
    '../../../assets/css/spinner.css'
    ],
  providers: [ ApiService ]
})

export class AdminComponent {
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  accountAlreadyCreated = false;
  newUsername = '';
  key = '';
  username: string;
  userUpdated = false;
  keyError = false;
  allArticles = [];
  isBusy = 100;
  isBusyPublishUnpublish = {};
  showSpinner = true;

  public adminForm = this._fb.group({
      authorName: ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
      blogName: ["", Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(3)])],
      heading: ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
      subheading: ["", Validators.compose([Validators.required, Validators.maxLength(45), Validators.minLength(3)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4)])],
  });

  constructor(private _fb: FormBuilder, private _api : ApiService){
    this.username = document.location.pathname.substr(1).split('/')[0];

    // Initialize isBusy
    this.isBusy = 0;

    // Initialize isBusyPublishUnpublish
    // this.isBusyPublishUnpublish = 0;

    // Check if the username in the config exists on the backend
    this.userExists(this.username);

    
    // Get articles
    this.getArticles();
  }

  // Check if a user exists
  userExists(value){
    // Set busy
    this.setBusy();

    this._api.getUserAvailability(value).subscribe(
        res => {
          // Set idle
          this.setIdle();

          if(!res.available){
            this.accountAlreadyCreated = true;
          }
        }
      );
  }

  savePreferences(){
    // Set busy
    this.setBusy();

    let more = this.adminForm.value;

    let data = {
      username : this.username,
      name : more.authorName,
      blogName : more.blogName,
      heading : more.heading,
      subheading : more.subheading,
      key: more.key
    };

    this.keyError = false;

    // Update user
    this._api.updateUsername(data).subscribe(
      res => {
        // Set idle
        this.setIdle();

        if(JSON.parse(res['_body']).status == 'success')
          this.userUpdated = true;
        else if(JSON.parse(res['_body']).status == 'key-error'){
          this.keyError = true;
        }
      }
    );
  }

  // Get all articles
  getArticles(){
    // Set busy
    this.setBusy();
    
    this._api.getArticles(this.username).subscribe(
      res => {
        // Set idle
        this.setIdle();

        this.allArticles = res;
      } 
    )
  }


  publishArticle(i){
    // Set busy
    this.setBusyPublishUnpublish(i);

    this._api.publishArticle(i).subscribe(
      res => {
        
        // Set idle
        this.setIdlePublishUnpublish(i);

        // Update list on the admin page
        this.getArticles();
      }
    )
  }

  unpublishArticle(i){
    // Set busy
    this.setBusyPublishUnpublish(i);

    this._api.unpublishArticle(i).subscribe(
      res => {
        
        // Set idle
        this.setIdlePublishUnpublish(i);

        // Update list on the admin page
        this.getArticles();
      }
    )
  }

  deleteArticle(i){
    // Set busy
    this.setBusyPublishUnpublish(i);

    this._api.deleteArticle(i).subscribe(
      res => {
        // Set idle
        this.setIdlePublishUnpublish(i);

        // Update list on the admin page
        this.getArticles();
      }
    )
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


  // Set busy
  setBusyPublishUnpublish(i){
    this.isBusyPublishUnpublish[i] = this.isBusyPublishUnpublish[i] == undefined ? 1 : this.isBusyPublishUnpublish[i] + 1;
  }

  // Set idle
  setIdlePublishUnpublish(i){
    this.isBusyPublishUnpublish[i] = this.isBusyPublishUnpublish[i] == undefined ? 0 : this.isBusyPublishUnpublish[i] - 1;
  }

}
