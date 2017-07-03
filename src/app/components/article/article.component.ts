import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import {Observable} from 'rxjs/Rx';

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

  constructor(private _r : Router, private _api : ApiService){
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

    this._api.getArticle(this._r.url.substr(1).split("/")[1], this.username).subscribe(
      res => this.onGetArticle(res[0])
    );
  }

  onGetArticle(res){
    // Set idle
    this.setIdle();

    this.data = res;
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
}
