import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import {Observable} from 'rxjs/Rx';
import { FormBuilder, Validators } from '@angular/forms'

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: [
    './article.component.css',
    '../../../assets/css/spinner.css'
    ],
  providers: [ ApiService ]
})

export class ArticleComponent {
  data = {
    tags : '',
    image : ''
  };
  username;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  isBusy = 100;
  showSpinner = true;
  commentPosted = false;
  comment;
  commentor;
  numberOfPublishedComments = 0;


  public commentsForm = this._fb.group({
      comment: ["", Validators.compose([Validators.required, Validators.maxLength(1200), Validators.minLength(2)])],
      commentor: ["", Validators.compose([ Validators.maxLength(20), Validators.minLength(6)])],
  });

  constructor(private _r : Router, private _api : ApiService, private _fb : FormBuilder){
    this.username = this._r.url.substr(1).split('/')[0];

    // Initialize isBusy
    this.isBusy = 0;

    this._r.events.subscribe((val) => {
      this.onRouteChange();
    });
  }
  
  onRouteChange(){
    // Set busy
    this.setBusy();

    // Get article data
    this._api.getArticle(this._r.url.substr(1).split("/")[1], this.username).subscribe(
      res => this.onGetArticle(res[0])
    );
  }

  onGetArticle(res){
    // Set idle
    this.setIdle();

    // Set article data variable
    this.data = res;

    // Set number of published comments
    if(res)
    for(let comment of res.comments.all){
      if(comment.published) this.numberOfPublishedComments++;
    }
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

  // On comment submit by a user
  onCommentSubmit(){    
    let data = {
      comment : this.commentsForm.value.comment,
      _id : Math.floor(Math.random() * 10000000) + 10000, 
      article : this.data['_id'],
      date : new Date().getTime(),
      published : false,
      commentor : this.commentsForm.value.commentor ? this.commentsForm.value.commentor : ''
    }
    
    this._api.postComment(data).subscribe(
      res => {
        if(JSON.parse(res['_body']).status == 'success'){
          this.commentPosted = true;
          
          // Get article data
          this._api.getArticle(this._r.url.substr(1).split("/")[1], this.username).subscribe(
            res => this.onGetArticle(res[0])
          );

          if(this.isBusy == 0){
          let timer = Observable.timer(1200);
          timer.subscribe(
            t => {
            this.commentPosted = false;
          });
        }

          // Reset form
          this.comment = '';
        }
      }
    );
  }
}
