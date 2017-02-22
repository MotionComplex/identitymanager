import { Component } from '@angular/core';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { WebConfigLoaderService } from './services/web-config-loader/web-config-loader.service';

import { WebConfig } from './models/web-config/web-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private stsUrl: string = 'http://localhost:35854';
  private scopes: string = 'openid profile mandant';
  private clientUrl: string = 'http://localhost:4200';
  private webConfig: WebConfig;

  constructor(private oauthService: OAuthService, private webConfigLoaderService: WebConfigLoaderService) {
    this.configureAuthentication();
  }

  private configureAuthentication() {
    this.webConfigLoaderService.getWebConifg()
      .subscribe(data => {
        this.webConfig = new WebConfig(data.stsUrl, data.clientUrl, data.authentication, data.clientId, data.scopes)
        console.log(this.webConfig);
        this.webConfig = data;
      },
      error => {
        console.log(error)
      },
      () => {
        this.configureOAuhtService();
      });
  }

  private configureOAuhtService() {
      this.oauthService.loginUrl = this.webConfig.stsUrl + '/core/connect/authorize';
      this.oauthService.redirectUri = window.location.protocol + '//' + window.location.host;
      this.oauthService.clientId = "identitymanager";
      this.oauthService.issuer = this.webConfig.stsUrl;
      this.oauthService.scope = this.webConfig.scopes;
      this.oauthService.oidc = true;
      this.oauthService.setStorage(localStorage);
      this.oauthService.logoutUrl = this.webConfig.stsUrl + "/core/connect/endsession?id_token={{id_token}}&post_logout_redirect_uri=" + this.webConfig.clientUrl;
      this.oauthService.tryLogin({});
  }
}
