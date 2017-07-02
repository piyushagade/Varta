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

  activateMenuItem(item){
    this.activeMenuItem = item;
  }

  constructor(private _r : Router){
    this._r.events.subscribe((val) => {
      this.onRouteChange();
    });
  }

  onRouteChange(){
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
  }
}
