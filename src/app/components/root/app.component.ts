import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  onActivate(e, outlet){
    outlet.scrollTop = 0;
  }

  constructor(private router: Router){
  }

  onDeactivate() {
    document.body.scrollTop = 0;
}
}
