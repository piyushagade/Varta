import { Component, Input } from '@angular/core';
import * as config from '../../config/config';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  @Input() data;
  @Input() index;
  dirs = config.constants.dirs;

  constructor(){
  }
}
