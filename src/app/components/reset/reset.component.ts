import { Component } from '@angular/core';
import * as config from '../../config/config';
import { ApiService } from '../../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import {EmailValidators} from 'ngx-validators'

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  providers: [ ApiService ]
})

export class ResetComponent {
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
  emailSent;
  emailError;

  public resetForm = this._fb.group({
      email: ["", Validators.compose([Validators.required, Validators.maxLength(50), Validators.minLength(6), EmailValidators.normal])],
  });

  constructor(private _fb: FormBuilder, private _api : ApiService){
    this.username = document.location.pathname.substr(1).split('/')[0];

    // check if the username in the config exists on the backend
    if(this.username != '') this.userExists(this.username);
  }

  onReset(email){
    // Reset errors
    this.emailError = false;
    this.emailSent = false;
    
    this._api.resetKey(email).subscribe(
      res => {
        if(res.status == "success")
          this.emailSent = true;
        else if(res.status == 'email-error')
          this.emailError = true;
      }
    )
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
