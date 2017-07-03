import { Component, trigger, state, animate, transition, style } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as config from '../../config/config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger("fadeInOut", [
      state("open", style({opacity: 1})),
      state("closed", style({opacity: 0})),
      transition("open => closed", animate( "1200ms" )),
      transition("closed => open", animate( "400ms" )),
    ])
  ],
})

export class AppComponent {
  username;
  dirs = config.constants.dirs;
  admin = config.constants.admin;
  parameters = config.constants.parameters;

  onActivate(e, outlet){
    // outlet.scrollTop = 0;
  }

  constructor(private _r: Router){
    this.username = document.location.pathname.substr(1).split('/')[0];
  }

  onDeactivate() {
    document.body.scrollTop = 0;
  }
}
