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
  keyErrorManage = false;
  allArticles = [];
  isBusy = 100;
  isBusyPublishUnpublish = {};
  showSpinner = true;
  showArticles = false;
  user = {};
  authorName;
  blogName;
  blogHeading;
  blogSubheading;
  manageCommentsArticle;
  commentsVisible;

  public adminForm = this._fb.group({
      authorName: ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
      blogName: ["", Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(3)])],
      heading: ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
      subheading: ["", Validators.compose([Validators.required, Validators.maxLength(45), Validators.minLength(3)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4)])],
  });

  public manageArticlesForm = this._fb.group({
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

            // Get user data
            this.getUserData();
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

  getUserData(){
    // Get user data
    this._api.getUserData(this.username).subscribe(
      res => {
        // Set user data
        this.user = res;
        
        // Set form input
        this.authorName = res.name;
        this.blogName = res.blogName;
        this.blogHeading = res.heading;
        this.blogSubheading = res.subheading;
      }
    );
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

    // Hide manage comments panel if visible
    this.commentsVisible = false;
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

  verifyKeyManageArticles(){
    
    // Get key
    this._api.getKey(this.username).subscribe(
      res => {
        if(res.code != this.manageArticlesForm.value.key) {
          this.keyErrorManage = true;
          this.showArticles = false;
        }
        else{
          this.keyErrorManage = false;
          this.showArticles = true;
        }       
      }
    );
    
  }

  //Show comments waiting to be reviewed
  showComments(id){
    id = id.substr(1);

    this.commentsVisible = true;

    // Get article whose identifier is id
    this._api.getArticle(id, this.username).subscribe(
      res => this.manageCommentsArticle = res
    );
    
  }

  // Toggle the state of comments between published and unpublished
  togglePublished(comment_id, article_id, article_identifier){
    
    this._api.toggleCommentsPublished(article_id, comment_id).subscribe(
      res => {
        if(res.status == 'success'){
          // Get article whose where the comment with comment_id lies
          this._api.getArticle(article_identifier.substr(1), this.username).subscribe(
            res => {
              if(res) this.manageCommentsArticle = res;
            }
          );
        }
      }
    );   
  }

}
