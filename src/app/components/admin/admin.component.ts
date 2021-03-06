import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import {Observable} from 'rxjs/Rx';
import {DomSanitizer} from '@angular/platform-browser';
import { Http, Jsonp, RequestOptions, Headers } from '@angular/http'

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
  lengths = config.constants.parameters.lengths;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  accountAlreadyExists = false;
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
  adminAuthenticated = false;
  user = {};
  authorName;
  blogName;
  blogHeading;
  blogSubheading;
  manageCommentsArticle;
  commentsVisible;
  backup_uri;
  today;
  hasUnreviewedComments = {};
  fileSelected = false;
  fileToBeUploaded;
  fileUploaded = false;
  fileUploadError = false;

  public adminForm = this._fb.group({
      authorName: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.authorName.max), Validators.minLength(this.lengths.authorName.min)])],
      blogName: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.blogName.max), Validators.minLength(this.lengths.blogName.min)])],
      heading: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.heading.max), Validators.minLength(this.lengths.heading.min)])],
      subheading: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.subheading.max), Validators.minLength(this.lengths.subheading.min)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.key.max), Validators.minLength(this.lengths.key.min)])],
  });

  public manageArticlesForm = this._fb.group({
     key: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.key.max), Validators.minLength(this.lengths.key.min)])],
  });

  constructor(private _fb: FormBuilder, private _api : ApiService, private _sanitizer : DomSanitizer, private _http : Http){
    this.username = document.location.pathname.substr(1).split('/')[0];

    // Initialize isBusy
    this.isBusy = 0;

    // Initialize isBusyPublishUnpublish
    // this.isBusyPublishUnpublish = 0;

    // Check if the username in the config exists on the backend
    this.userExists(this.username);

    // Set date
    this.today = new Date().getMonth() + '_' + new Date().getDate() + '_' + new Date().getFullYear() + '.json';
    
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
            this.accountAlreadyExists = true;

            // Get user data
            this.getUserData();
          }
        }
      );
  }

  // Save preferences
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

  // Get all articles data
  getArticles(){
    // Set busy
    this.setBusy();
    
    this._api.getArticles(this.username).subscribe(
      res => {
        // Set idle
        this.setIdle();

        this.allArticles = res;

        // Look for unpublished comments
        for(let i = 0; i < res.length; i++){  // ith article
          let comments = res[i].comments.all;
          this.hasUnreviewedComments[i] = false;

          for(let j = 0; j < comments.length; j++){ // jth comment
            if(comments[j].published == false){
              this.hasUnreviewedComments[i] = true;
            }
          }
        }
      } 
    )
  }

  // Get user data like name, heading, subheading
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

  // Publish article
  publishArticle(i){
    // Set busy
    this.setBusyPublishUnpublish(i);

    this._api.publishArticle(i).subscribe(
      res => {
        
        // Set idle
        this.setIdlePublishUnpublish(i);

        // Update articles list on the admin page
        this.getArticles();
      }
    )
  }

  // Unpublish article
  unpublishArticle(i){
    // Set busy
    this.setBusyPublishUnpublish(i);

    this._api.unpublishArticle(i).subscribe(
      res => {
        
        // Set idle
        this.setIdlePublishUnpublish(i);

        // Update articles list on the admin page
        this.getArticles();
      }
    )
  }

  // Delete article
  deleteArticle(i){
    // Set busy
    this.setBusyPublishUnpublish(i);

    this._api.deleteArticle(i).subscribe(
      res => {
        // Set idle
        this.setIdlePublishUnpublish(i);

        // Update articles list on the admin page
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

  // Set busy for pubunpub
  setBusyPublishUnpublish(i){
    this.isBusyPublishUnpublish[i] = this.isBusyPublishUnpublish[i] == undefined ? 1 : this.isBusyPublishUnpublish[i] + 1;
  }

  // Set idle for pubunpub
  setIdlePublishUnpublish(i){
    this.isBusyPublishUnpublish[i] = this.isBusyPublishUnpublish[i] == undefined ? 0 : this.isBusyPublishUnpublish[i] - 1;
  }

  // Verify key so that user could manage articles
  verifyKeyManageArticles(){
    
    // Get key
    this._api.verifyKey(this.username, this.manageArticlesForm.value.key).subscribe(
      res => {
        if(!res.verified) {
          this.keyErrorManage = true;
          this.adminAuthenticated = false;
        }
        else{
          this.keyErrorManage = false;
          this.adminAuthenticated = true;
          this.downloadArticlesData();
        }       
      }
    );
    
  }

  // Check if any article has unreviewd comments
  checkForUnreviewedComments(id){
    if(id == 'hide') this.commentsVisible = false;
    else{
      id = id.substr(1);

      this.commentsVisible = true;
      
      // Refresh comments in some time interval
      let timer = Observable.timer(1, 60000);
        timer.subscribe(
          t => {
          // Get comments of the article whose identifier is id
          this._api.getArticle(id, this.username).subscribe(
            res => this.manageCommentsArticle = res
          );
        });
    }
  }

  // Show comments for an article
  showComments(id){
    if(id == 'hide') this.commentsVisible = false;
    else{
      id = id.substr(1);

      this.commentsVisible = true;
      
      // Refresh comments in some time interval
      let timer = Observable.timer(1, 60000);
        timer.subscribe(
          t => {
          // Get comments of the article whose identifier is id
          this._api.getArticle(id, this.username).subscribe(
            res => {
              this.manageCommentsArticle = res;
            }
          );
        });
    }
  }

  // Toggle the state of comments between published and unpublished
  toggleCommentsPublished(comment_id, article_id, article_identifier){
    this._api.toggleCommentsPublished(article_id, comment_id).subscribe(
      res => {
        if(res.status == 'success'){
          // Get article whose where the comment with comment_id lies
          this._api.getArticle(article_identifier.substr(1), this.username).subscribe(
            res => {
              if(res) this.manageCommentsArticle = res;
              
              // Look for unreviewed/unpublished comments
              let comments = res[0].comments.all;
              for(let j = 0; j < this.allArticles.length; j++){ // Every article
                if(this.allArticles[j].link == res[0].link){  // Select the article which is current article
                  // Update allArticles
                  this.allArticles[j] = res[0];
                  
                  this.hasUnreviewedComments[j] = false;
                  for(let i = 0; i < this.allArticles[j].comments.all.length; i++){ // Every comment
                    if(this.allArticles[j].comments.all[i].published == false){
                      this.hasUnreviewedComments[j] = true;
                    }
                  }
                }
              }
            }
          );
        }
      }
    );   
  }

  // Delete comment
  deleteComment(comment_id, article_id, article_identifier){
    this._api.deleteComment(article_id, comment_id).subscribe(
      res => {
        // Update comments list on the admin page
        this._api.getArticle(article_identifier.substr(1), this.username).subscribe(
          res => this.manageCommentsArticle = res
        );
      }
    )
  }

  // Refresh comments
  refreshComments(article_identifier){
    // Update comments list on the admin page
    this._api.getArticle(article_identifier.substr(1), this.username).subscribe(
      res => this.manageCommentsArticle = res
    );
  }


  // Backup data
  downloadArticlesData(){
    // Get JSON object
    // Set busy
    this.setBusy();
    let obj;
    
    this._api.getArticles(this.username).subscribe(
      res => {
        // Set idle
        this.setIdle();

        // Set data of the object
        obj = res;

        // Make a file
        var theJSON = JSON.stringify(obj);
        this.backup_uri = "data:application/text;charset=UTF-8," + encodeURIComponent(JSON.stringify(obj));
      } 
    )
  }
  // Sanitize URL
    sanitize(url:string){
      return this._sanitizer.bypassSecurityTrustUrl(url);
  }

  
  fileChange(event) {
    // Set file selected
    this.fileSelected = true;

    this.fileToBeUploaded = event.target.files; // FileList object
  }

  uploadFile(){
    var self = this;
    let files = this.fileToBeUploaded;
    // files is a FileList of File objects. List some properties.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function (theFile) {
        return function (e) {
          try {
            let data = JSON.parse(e.target.result);
            
            data = {
              data : data,
              username : self.username,
            }

            // Upload to server
            self._api.uploadBackupFile(data).subscribe(
              res => {
                
                if(JSON.parse(res['_body']).status == 'success'){
                  self.fileUploaded = true;
                  self.fileUploadError = false;

                  let timer = Observable.timer(1200);
                  timer.subscribe(
                    t => {
                    self.fileUploaded = false;
                  });

                  // Get articles
                  self.getArticles();
                }
                else if(JSON.parse(res['_body']).status == 'not-found'){
                  self.fileUploaded = false;
                  self.fileUploadError = true;

                  let timer = Observable.timer(1200);
                  timer.subscribe(
                    t => {
                    self.fileUploadError = false;
                  });
                }
              });

          } catch (ex) {
            console.log("Error reding the file uploaded. " + ex);
          }
        }
      })(f);

      reader.readAsText(f);
    }
    
  }

  deleteAccount(){
    this._api.deleteAccount(this.username).subscribe(
      res => {
        console.log(res);
        this.accountAlreadyExists = false;
        this.adminAuthenticated = false;
      }
    )};
}
