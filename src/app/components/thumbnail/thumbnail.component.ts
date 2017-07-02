import { Component, Input } from '@angular/core';
import * as config from '../../config/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.css']
})
export class ThumbnailComponent {
  @Input() data;
  @Input() index;
  @Input() username;
  dirs = config.constants.dirs;
  config = config.constants;

  constructor(private _r : Router){

  }
}
