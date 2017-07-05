import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  @Input() data;
  @Input() index;
  @Input() username;
  @Output() searchEvent = new EventEmitter();

  dirs = config.constants.dirs;
  config = config.constants;
  route;

  public searchForm = this._fb.group({
      searchString: ["", Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(2)])]
  });


  constructor(private _r : Router, private _fb : FormBuilder, private _api : ApiService){
    this.route = this._r.url.substr(1).split("/")[1];
  }

  // Search articles
  searchArticles(){
    // Change route
    if(this.searchForm.value.searchString && this.searchForm.value.searchString.length != 0)
      this._r.navigateByUrl('/' + this.username + '/search/' + this.searchForm.value.searchString);
  }
}
