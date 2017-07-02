import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ ApiService ]
})
export class AdminComponent {
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  accountAlreadyCreated = false;
  newUsername = '';
  key = '';
  username: string;
  userUpdated = false;
  keyError = false;

  public adminForm = this._fb.group({
      authorName: ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
      blogName: ["", Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(3)])],
      heading: ["", Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
      subheading: ["", Validators.compose([Validators.required, Validators.maxLength(45), Validators.minLength(3)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4)])],
  });

  constructor(private _fb: FormBuilder, private _api : ApiService){
    this.username = document.location.pathname.substr(1).split('/')[0];

    // check if the username in the config exists on the backend
    this.userExists(this.username);
  }

  userExists(value){
    this._api.getUserAvailability(value).subscribe(
        res => {
          if(!res.available){
            this.accountAlreadyCreated = true;
          }
        }
      );
  }

  savePreferences(){
    let more = this.adminForm.value;

    let data = {
      username : this.username,
      name : more.authorName,
      blogName : more.blogName,
      heading : more.heading,
      subheading : more.subheading,
      key: more.key
    };

    this.keyError = false;

    // Update user
    this._api.updateUsername(data).subscribe(
      res => {
        if(JSON.parse(res['_body']).status == 'success')
          this.userUpdated = true;
        else if(JSON.parse(res['_body']).status == 'key-error'){
          this.keyError = true;
        }
      }
    );
  }
}
