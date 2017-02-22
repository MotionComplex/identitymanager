import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { appRoutes } from './../../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private routes = appRoutes.filter(r => r.data['relevantForNav']);

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
  }

  private login() {
    console.log('trying to log in via oauthService');
    this.oauthService.initImplicitFlow();
  }

  private isLoggedIn(): boolean {
    console.log('checking if is logged in');

    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }
}
