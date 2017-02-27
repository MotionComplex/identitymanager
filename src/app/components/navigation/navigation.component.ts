// agnular imports
import { Component } from '@angular/core';

// 3rd-party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// custom modules
// improts the routing module for the relevant navigation links
import { appRoutes } from './../../app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  private pageTitle: string;
  private routes = appRoutes.filter(r => r.data['relevantForNav']);

  constructor(private oauthService: OAuthService) {
    this.pageTitle = 'IdentityManager';
  }

  // logs in on IdentityServer via oauthService (redirects to login-url defined in the root-component)
  private login() {
    this.oauthService.initImplicitFlow();
  }

  // logs out from IdentityServer via oauthService (redirects to logout-url defined in the root-component)
  private logout() {
    this.oauthService.logOut();
  }

  // checks if the access and identity tokens are valid (user is logged in) and returns true if both are and false if one or both of them are invalid
  private isLoggedIn(): boolean {
    return this.oauthService.hasValidIdToken() && this.oauthService.hasValidAccessToken();
  }
}
