import { Component, OnInit } from '@angular/core';

import { appRoutes } from './../../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private routes = appRoutes.filter(r => r.data['relevantForNav']);

  constructor() { }

  ngOnInit() {
  }

  private login() {
    console.log('trying to log in');
    // call login service
  }

  private isLoggedIn(): boolean {
    console.log('checking if is logged in');
    // call service
    return false;
  }
}
