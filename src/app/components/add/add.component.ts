import { Component } from '@angular/core';
import * as config from '../../config/config';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  author;
  public articleForm = this._fb.group({
      title: ["", Validators.required],
      introduction: ["", Validators.required],
      text: ["", Validators.required],
      key: ["", Validators.required],
      image: [""]
  });

  constructor(private _fb: FormBuilder){
    this.author = config.constants.admin.name;
  }

  onNewArticleSubmit(event) {
    console.log(event);
    console.log(this.articleForm.value);
  }
}
