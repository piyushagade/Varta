import { Component } from '@angular/core';
import * as config from '../../config/config';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  author;

  constructor(){
    this.author = config.constants.admin.name;
  }
}
