import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Injectable()
export class AuthGuardService implements CanActivate  {

  constructor(private oauthService: OAuthService, private router: Router) { }

  canActivate() {
    let isAuthorized = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken();
    if (!isAuthorized) {
      this.router.navigate(['/unauthorized']);
    }

    return isAuthorized;
  }
}
