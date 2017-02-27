// angular imports
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// 3rd party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// custom services
import { WebConfigLoaderService } from '../web-config-loader/web-config-loader.service';

// models
import { WebConfig } from '../../models/web-config/web-config';

@Injectable()
export class AuthGuardService implements CanActivate  {
  private webConfig: WebConfig;

  constructor(private router: Router, 
              private oauthService: OAuthService, 
              private webConfigLoaderService: WebConfigLoaderService) {  }

  // decides if a route can be activated and navigates to an unauthorized page if the user is not authorized to access the requested page
  canActivate() {
    // if(!this.webConfig.authentication){
    //   return true;
    // }

    let isAuthorized = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    if (!isAuthorized) {
      this.router.navigate(['/unauthorized']);
    }

    return isAuthorized;
  }
}
