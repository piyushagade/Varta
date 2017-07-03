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
  accountAlreadyCreated = false;
  newUsername = '';
  key = '';
  username: string;
  notEnoughCharsError = false;
  userCreated = false;

  public userForm = this._fb.group({
      username: ["", Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6)])],
  });

  constructor(private _fb: FormBuilder, private _api : ApiService){
    this.username = document.location.pathname.substr(1).split('/')[0];
    this.username = this.username == 'varta-key' ? '' : this.username;

    // check if the username in the config exists on the backend
    if(this.username != '') this.userExists(this.username);
  }

  onUserNameSubmit(username){
    let data = {
      username : username,
      key : '0',
      name : 'Anonymous',
      blogName : config.constants.parameters.blog,
      heading : config.constants.parameters.heading,
      subheading : config.constants.parameters.subheading
    }

    this._api.getKey(username).subscribe(
      res => {
        this.key = res.code;
      }
    )

    this._api.registerUsername(data).subscribe(() => {
      this.userCreated = true;
    });
  }

  // Check if user exists
  userExists(value){
    this._api.getUserAvailability(value).subscribe(
        res => {
          if(!res.available){
            this.accountAlreadyCreated = true;
          }
          else{
            for(let i = 0; i < this.username.length; i++){
              if(this.username)
               this.newUsername += this.username.charAt(i);
               if(i == this.username.length - 1) this.onUsernameChange(this.newUsername);
               
               if(this.username.length < 6) { 
                 this.notEnoughCharsError = true;
               }
            }
            
          }
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
    return this.available;
  }
}
