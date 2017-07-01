import { Component } from '@angular/core';
import { Router } from '@angular/router';
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
      title: ["", Validators.compose([Validators.required, Validators.maxLength(35), Validators.minLength(6)])],
      introduction: ["", Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(15)])],
      text: ["", Validators.compose([Validators.required, Validators.minLength(20)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4)])],
      image: [""]
  });

  constructor(private _fb: FormBuilder, private _api: ApiService, private _r: Router){
    this.author = config.constants.admin.name;
  }

  onNewArticleSubmit(event) {
    let data = this.articleForm.value;
    
    // Add some more information
    data.link = '/' + data.title.toLowerCase().replace(/\s/g, "-");    
    data.author = config.constants.admin.name;
    data.date = new Date().getTime();

    // Update data store
    this._api.addArticle(data).subscribe(
        res => {
          this.onPostArticle(res, data);
        },
        err => console.log(err.json().message),
        () => console.log('Transaction complete')
    );    
  }

  onPostArticle(res, data){
    if(JSON.parse(res._body).status) this._r.navigateByUrl(data.link);
    
  }
}
