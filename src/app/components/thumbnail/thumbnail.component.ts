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
  searchResultsLoaded = false;
  searchString;

  public searchForm = this._fb.group({
      searchString: ["", Validators.compose([Validators.required, Validators.maxLength(100), Validators.minLength(2)])]
  });


  constructor(private _r : Router, private _fb : FormBuilder, private _api : ApiService){
  }

  // Search articles
  searchArticles(){
    this.searchString = this.searchForm.value.searchString;
    this.searchEvent.emit(this.searchString);
    this.searchResultsLoaded = true;
  }

  // Show all articles
  showAllButton(){
    this.searchEvent.emit('showall');
    this.searchResultsLoaded = false;
  }
}
