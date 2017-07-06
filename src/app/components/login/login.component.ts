import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ ApiService ]
})
export class LoginComponent {
  blog;
  noArticles;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;
  username;
  userAlreadyExists;

  public loginForm = this._fb.group({
      username: ["", Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])],
  });

  constructor(private _r: Router, private _api : ApiService, private _fb : FormBuilder){
    // this._r.events.subscribe((val) => {
    //   this.onRouteChange();
    // });
  }


  // On route change
  // onRouteChange(){
  //   this.username = this._r.url.substr(1).split("/")[0];
  // }

  // On username field change
  onUserNameChange(username){
    if(username && username != '') this.userExists(username);
  }

  // Check if user exists
  userExists(value){    
    this._api.getUserAvailability(value).subscribe(
      res => {
        // User exists
        if(!res.available){
          this.userAlreadyExists = true;
        }

        // No user with that username
        else{
          this.userAlreadyExists = false;
        }
      }
    );
  }
}
