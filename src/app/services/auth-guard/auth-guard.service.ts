import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { WebConfigLoaderService } from '../web-config-loader/web-config-loader.service';
import { WebConfig } from '../../models/web-config/web-config';

@Injectable()
export class AuthGuardService implements CanActivate  {
  private webConfig: WebConfig;
  constructor(private oauthService: OAuthService, private router: Router, private webConfigLoaderService: WebConfigLoaderService) {  }

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
