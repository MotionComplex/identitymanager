// angular imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// 3rd party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// models
import { WebConfig } from '../../models/web-config/web-config';

@Injectable()
export class AuthGuardService implements CanActivate  {

  constructor(private router: Router, 
              private oauthService: OAuthService) {}
              
  // decides if a route can be activated and navigates to an unauthorized page if the user is not authorized to access the requested page
  canActivate() {
    const isAuthorized = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    if (!isAuthorized) {
      this.router.navigate(['/unauthorized']);
    }

    return isAuthorized;
  }
}
