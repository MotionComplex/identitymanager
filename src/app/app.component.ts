// agnular imports
import { Component, ViewContainerRef } from '@angular/core';

// 3rd-party imports
import { OAuthService } from 'angular2-oauth2/oauth-service';

// custom services
import { WebConfigLoaderService } from './services/web-config-loader/web-config-loader.service';

// models
import { WebConfig } from './models/web-config/web-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private webConfig: WebConfig;

  constructor(private oauthService: OAuthService,
              private webConfigLoaderService: WebConfigLoaderService) {
                this.loadWebConfig();
              }

  // loads data from the web.config.json file via webConfigLoaderService and configures oauth-service after that
  private loadWebConfig() {
    this.webConfigLoaderService.getWebConifg()
      .subscribe(data => {
        console.log(data);
        this.webConfig = new WebConfig(data.stsUrl, data.clientUrl, data.authentication, data.clientId, data.scopes);
        this.webConfig = data;
      },
      error => {
        console.log(error);
      },
      () => {
        this.configureOAuhtService();
      });
  }

  // sets all relevant values for authentication on IdentityServer via OAuthService (angular2-oauth2)
  private configureOAuhtService() {
      this.oauthService.loginUrl = this.webConfig.stsUrl + '/core/connect/authorize';
      this.oauthService.redirectUri = window.location.protocol + '//' + window.location.host;
      this.oauthService.clientId = 'identitymanager';
      this.oauthService.issuer = this.webConfig.stsUrl;
      this.oauthService.scope = this.webConfig.scopes;
      this.oauthService.oidc = true;
      this.oauthService.setStorage(localStorage);
      this.oauthService.logoutUrl = this.webConfig.stsUrl
          + '/core/connect/endsession?id_token_hint={{id_token}}&post_logout_redirect_uri='
          + this.webConfig.clientUrl;
      this.oauthService.tryLogin({});
      this.saveTokens()
  }

  // has to save tokens because logout redirect to identitymanager doesn't work
  saveTokens() {
      this.saveAccessToken();
      this.saveIdToken();
  }

  // saves the id token to localStorage
  saveIdToken() {
      let hasIdToken = window.location.href.includes('id_token=');

      if (hasIdToken) {
          let tokenStart = window.location.href.search('id_token=');
          let tokenEnd = window.location.href.search('&access_token=');
          let id_token = window.location.href.substring(tokenStart + 9, tokenEnd);
          localStorage.setItem('id_token', id_token);
      }
  }

  // saves the access token to localStorage
  saveAccessToken() {
      let hasAccessToken = window.location.href.includes('access_token=');
      if (hasAccessToken) {
          let tokenStart = window.location.href.search('access_token=');
          let tokenEnd = window.location.href.search('&token_type=');
          let access_token = window.location.href.substring(tokenStart + 13, tokenEnd);
          localStorage.setItem('access_token', access_token);
      }
  }
}
