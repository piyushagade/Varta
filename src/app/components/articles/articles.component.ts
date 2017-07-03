import { Component, trigger, state, animate, transition, style } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: [
    './articles.component.css',
    '../../../assets/css/spinner.css'
    ],
  providers: [ ApiService ],
  animations: [
    trigger("fadeInOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0})),
      transition("open => closed", animate( "1200ms" )),
      transition("closed => open", animate( "400ms" )),
    ])
  ],
})

export class ArticlesComponent {
  blog;
  noArticles;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  username;
  userAlreadyExists;
  user = {};
  isBusy = 0;

  constructor(private _r: Router, private _api : ApiService){
    this.username = this._r.url.substr(1).split("/")[0];

    // Check if user exists
    this.userExists(this.username);
  }
  
  // Check if user exists
  userExists(value){
    
    this._api.getUserAvailability(value).subscribe(
      res => {
        //Set busy
        this.isBusy++;

        // User exists
        if(!res.available){
          //Set busy
          this.isBusy++;

          this.userAlreadyExists = true;
          
          this._api.getPublishedArticles(this.username).subscribe(
            res => this.onGetArticles(res)
          );

          // Get user data
          this._api.getUserData(this.username).subscribe(
            res => {

              // Set user data
              this.user = res;
            }
          );
        }

        // No user with that username, then show a 404
        else{
          //Set busy
          this.isBusy--;
          
          this.userAlreadyExists = false;
          this.noArticles = true;

          this._r.navigateByUrl('/404');
        }
      }
    );
  }

  // On get articles data
  onGetArticles(res){
    // Set idle
    this.isBusy--;

    // Set articles data
    this.blog = res;
    if(this.blog.length == 0) this.noArticles = true;
    else this.noArticles = false;
  }
}
