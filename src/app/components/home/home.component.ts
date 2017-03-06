// angular imports
import { Component } from '@angular/core';

// 3rd-party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// custom modules
// improts the routing module for the relevant navigation links
import { appRoutes } from './../../app-routing.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private authorizedTitle: string;
  private unauthorizedTitle: string;
  private routes = appRoutes.filter(r => r.data['relevantForNav']);

  constructor(private oauthService: OAuthService) {
    this.authorizedTitle = 'Willkommen beim IdentityManager';
    this.unauthorizedTitle = 'Hier anmelden:';
  }

  // logs in on IdentityServer via oauthService (redirects to login-url defined in the root-component)
  private login() {
    console.log('trying to log in via oauthService');
    this.oauthService.initImplicitFlow();
  }

  // checks if the access and identity tokens are valid (user is logged in) and returns true if both are and false if one or both of them are invalid
  private isLoggedIn(): boolean {
    console.log('checking if is logged in');

    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }
}
