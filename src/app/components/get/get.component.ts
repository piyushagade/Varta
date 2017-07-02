import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css'],
  providers: [ ApiService ]
})
export class GetComponent {
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  available: boolean;
  newUsername;
  key = '';

  public userForm = this._fb.group({
      username: ["", Validators.compose([Validators.required, Validators.maxLength(35), Validators.minLength(6)])],
  });

  constructor(private _fb: FormBuilder, private _api : ApiService){
 
  }

  onUserNameSubmit(value){
    this._api.registerUsername(value).subscribe(
      res => {
        this.key = res.code;
      }
    );
  }

  onUsernameChange(value){
    if(value != ''){
      this.newUsername = value.toLowerCase().replace(/\s/g, "-")
      this._api.getUserAvailability(value).subscribe(
        res => this.onGetAvailability(res)
      );
    }
  }

  onGetAvailability(res){
    this.available = res.available;
  }
}
