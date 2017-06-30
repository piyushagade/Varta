import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [ ApiService ]
})

export class HeaderComponent {
  menuItems = {
    items : [
      { 
        title : 'Home',
        link : '/'
      },
      { 
        title : 'Me',
        link : '/first'
      },
      { 
        title : 'This',
        link : '/this'
      },
    ]
  };
  activeMenuItem;

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
      this.activateMenuItem(this.menuItems['items'][0]);
    }

    // Activate only those items which are in the menuItems object (when clicked)
    let flag = false;
    for(let item of this.menuItems.items){
      if(item.title.indexOf(this._r.url.substr(1)) != -1){
        this.activateMenuItem(item);
        flag = true;
      }
    }

    if(!flag){
      this.activateMenuItem({});
    }
  }
}
