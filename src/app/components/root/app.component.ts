import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username;

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
