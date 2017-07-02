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

  constructor(private _r: Router, private _api : ApiService){
    this.username = this._r.url.substr(1).split("/")[0];

    // Check if user exists
    this.userExists(this.username);

    
  }

  onGetArticles(res){
    this.blog = res;
    if(this.blog.length == 0) this.noArticles = true;
    else this.noArticles = false;
  }

    userExists(value){
      this._api.getUserAvailability(value).subscribe(
        res => {

          // User exists
          if(!res.available){
            this.userAlreadyExists = true;
            
            this._api.getArticles(this.username).subscribe(
              res => this.onGetArticles(res)
            );
          }

          // No user with that username
          else{
            this.userAlreadyExists = false;
            this.noArticles = true;
          }
        }
      );
  }
}
