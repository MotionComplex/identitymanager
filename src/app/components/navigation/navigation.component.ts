import { Component, OnInit } from '@angular/core';
import { appRoutes } from './../../app-routing.module';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private pageTitle: string;
  private routes = appRoutes.filter(r => r.data['relevantForNav']);

  constructor(private oauthService: OAuthService) {
    this.pageTitle = 'IdentityManager';
  }

  ngOnInit() {
  }

  private login() {
    console.log('trying to log in');
    this.oauthService.initImplicitFlow();
  }

  private logout() {
    console.log('trying to log out');
    this.oauthService.logOut();
  }

  private isLoggedIn(): boolean {
    console.log('checking if is logged in');
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }
}
