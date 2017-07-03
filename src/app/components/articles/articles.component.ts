import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ ApiService ]
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

  constructor(private _r: Router, private _api : ApiService){
    this.username = this._r.url.substr(1).split("/")[0];

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

          // Get user data
          this._api.getUserData(this.username).subscribe(
            res => {
              this.user = res;
            }
          );
        }

        // No user with that username, then show a 404
        else{
          this.userAlreadyExists = false;
          this.noArticles = true;

          this._r.navigateByUrl('/404');
        }
      }
    );
  }


  onGetArticles(res){
    this.blog = res;
    if(this.blog.length == 0) this.noArticles = true;
    else this.noArticles = false;
  }
}
