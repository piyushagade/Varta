import { Component } from '@angular/core';
import * as config from '../../config/config';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [
    ApiService
  ]
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

  constructor(private _fb: FormBuilder, private _api: ApiService){
    this.author = config.constants.admin.name;
  }

  onNewArticleSubmit(event) {
    let data = this.articleForm.value;
    
    // Add some more information
    data.link = '/' + data.title.toLowerCase().replace(/\s/g, "-");    
    data.author = config.constants.admin.name;
    data.date = new Date().getTime();

    // Update data store
    this._api.addArticle(data);

    console.log(data.date);
    
  }
}
