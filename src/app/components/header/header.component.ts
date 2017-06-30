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
  activeMenuItem = 'Home';

  activateMenuItem(item: string){
    this.activeMenuItem = item;
  }
}
