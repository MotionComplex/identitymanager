import { Component, OnInit } from '@angular/core';

import { appRoutes } from './../../app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private pageTitle: string;
  private routes = appRoutes.filter(r => r.data['relevantForNav']);

  constructor() {
    this.pageTitle = 'IdentityManager';
  }

  ngOnInit() {
  }

  private login() {
    console.log('trying to log in');
  }

  private logout() {
    console.log('trying to log out');
  }

  // TODO: Return state from service
  private isLoggedIn(): boolean {
    console.log('checking if is logged in');
    return false;
  }
}
