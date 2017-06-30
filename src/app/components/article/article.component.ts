import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers: [ ApiService ]
})
export class ArticleComponent {
  page_id : string;
  data : {};

  constructor(private _r : Router, private _api : ApiService){  
    this.data = this._api.getArticle(this.page_id); 

    this._r.events.subscribe((val) => {
      this.onRouteChange();
    });
  }
  
  onRouteChange(){
    this.page_id = this._r.url.substr(1);
    this.data = this._api.getArticle(this.page_id); 
  }
}
