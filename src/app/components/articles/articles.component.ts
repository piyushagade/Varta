import { Component, trigger, state, animate, transition, style } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: [
    './articles.component.css',
    '../../../assets/css/spinner.css'
    ],
  providers: [ ApiService ],
  animations: [
    trigger("fadeOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0})),
      transition("open => closed", animate( "1200ms" )),
    ])
  ],
})

export class ArticlesComponent {
  blog;
  noArticles;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  lengths = config.constants.parameters.lengths;
  username;
  userAlreadyExists;
  user = {};
  isBusy = 100;
  showSpinner = true;

  public searchForm = this._fb.group({
      searchString: ["", Validators.compose([Validators.required, Validators.maxLength(this.lengths.search.max), Validators.minLength(this.lengths.search.min)])]
  });

  constructor(private _r: Router, private _api : ApiService, private _fb : FormBuilder){
    this.username = this._r.url.substr(1).split("/")[0];

    // Initialize isBusy
    this.isBusy = 0;

    // Check if user exists
    this.userExists(this.username);
  }

  // Check if user exists
  userExists(value){
    
    this._api.getUserAvailability(value).subscribe(
      res => {

        // User exists
        if(!res.available){
          this.userAlreadyExists = true;
          
          this._api.getPublishedArticles(this.username).subscribe(
            res => this.onGetArticles(res)
          );

          // Set busy
          this.setBusy();
          
          // Get user data
          this._api.getUserData(this.username).subscribe(
            res => {
              // Set user data
              this.user = res;
              
              // Set idle
              this.setIdle();
            }
          );
        }

        // No user with that username, then show a 404
        else{
          this.userAlreadyExists = false;
          this.noArticles = true;
          this._r.navigateByUrl('/404');

          //Set idle
          this.setIdle();
        }
      }
    );
  }

  // On get articles data
  onGetArticles(res){
    // Set articles data
    this.blog = res;
    if(this.blog.length == 0) this.noArticles = true;
    else this.noArticles = false;
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
  
  // Search articles
  searchArticles(){
    // Change route
    if(this.searchForm.value.searchString && this.searchForm.value.searchString.length != 0)
      this._r.navigateByUrl('/' + this.username + '/search/' + this.searchForm.value.searchString);
  }
}
