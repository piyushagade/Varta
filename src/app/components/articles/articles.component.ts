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
  blogs = {};
  config = config.constants;

  constructor(private _api : ApiService){
    this.blogs = _api.getArticles();
  }
}
