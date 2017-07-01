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
  noArticles;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;

  constructor(private _api : ApiService){
    _api.getArticles().subscribe(
      res => this.onGetArticles(res)
    );
  }

  onGetArticles(res){
    this.blog = res;
    if(this.blog.length == 0) this.noArticles = true;
    else this.noArticles = false;
  }
}
