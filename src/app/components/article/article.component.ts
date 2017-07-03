import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
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

  constructor(private _r : Router, private _api : ApiService){
    this.username = this._r.url.substr(1).split('/')[0];

    this._r.events.subscribe((val) => {
      this.onRouteChange();
    });
  }
  
  onRouteChange(){
    this._api.getArticle(this._r.url.substr(1).split("/")[1], this.username).subscribe(
      res => this.onGetArticle(res[0])
    );
  }

  onGetArticle(res){
    this.data = res;
  }
}
