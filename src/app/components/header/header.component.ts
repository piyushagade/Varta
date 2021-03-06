import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as menu from '../../config/menu';
import * as config from '../../config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ ApiService ]
})

export class HeaderComponent {
  activeMenuItem;
  menuItems = menu.menuItems.items;
  config = config.constants;
  @Input() username;
  user = {};
  onLoginPage = false;
  accountAlreadyCreated = false;

  activateMenuItem(item){
    this.activeMenuItem = item;
  }

  constructor(private _r : Router, private _api: ApiService){
    this._r.events.subscribe((val) => {
      this.onRouteChange();
    });
  }

  ngOnInit(){
    if(this.username == 'varta-key' || this.username == 'login' || this.username == '404'){
      this.onLoginPage = true;
      this.userExists(this.username);
    }
    else{
      this.onLoginPage = false;
      if(this.username) this.userExists(this.username);
    }
  }

  onRouteChange(){
    let username = this._r.url.substr(1).split("/")[0]
    if(username && username != '')
    if(username == 'varta-key' || username == 'login' || username == '404'){
      this.onLoginPage = true;
    }
    else{
      this.onLoginPage = false;
      this.username = username;
    }

    // Active Home menu item
    if(this._r.url.substr(1) == ''){
      this.activateMenuItem(this.menuItems[0]);
    }

    // Activate only those items which are in the menuItems object (when clicked)
    else{
      let flag = false;
      for(let item of this.menuItems){if(item.link.indexOf(this._r.url.substr(1)) != -1 && item.link == this._r.url){
          this.activateMenuItem(item);
          flag = true;
        }
      }
      
      // Activate none for all other routess
      if(!flag){
        this.activateMenuItem({});
      }
    } 

    

    // Get user data
    if(this.username != 'varta-key')
    this._api.getUserData(this.username).subscribe(
      res => {
        this.user = res;
      }
    );
  }

  // Check if a user exists
  userExists(value){
    this._api.getUserAvailability(value).subscribe(
        res => {

          // User exists
          if(!res.available){
            this.onLoginPage = false;
          }
          else{
            this.onLoginPage = true;
          }
        }
      );
  }

}
