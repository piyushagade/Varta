import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
  providers: [ ApiService ]
})
export class ArticlesComponent {
  blog;
  config = config.constants;

  constructor(private _api : ApiService){
    _api.getArticles().subscribe(
      res => this.onGetArticles(res)
    );
  }

  onGetArticles(res){
    this.blog = res;
  }
}
