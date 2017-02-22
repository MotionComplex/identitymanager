/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/';

import { NavigationStubComponent } from '../testing/navigation.stub';
import { RouterLinkStubDirective } from '../testing/router-stub';
import { OAuthService } from 'angular2-oauth2/oauth-service';
import { WebConfigLoaderService } from './services/web-config-loader/web-config-loader.service';
import { WebConfig } from './models/web-config/web-config';

describe('AppComponent', () => {
  let webConfig: WebConfig = {
    "stsUrl": "http://localhost:35854",
    "clientUrl": "http://localhost:4200",
    "authentication": true,
    "clientId": "identitymanager",
    "scopes": "openid profile mandant"
  };

  beforeEach(() => {
    let webConfigLoaderServiceStub = {
      getWebConifg: () => {
        return Observable.of(webConfig);
      }
    };

    let oauthServiceStub = {
      isLoggedIn: () => { return true },
      hasValidAccessToken: () => { return true },
      hasValidIdToken: () => { return true },
      setStorage: (storage: Storage) => { },
      tryLogin: () => {}
    };

    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavigationStubComponent,
        RouterLinkStubDirective
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: OAuthService, useValue: oauthServiceStub },
        { provide: WebConfigLoaderService, useValue: webConfigLoaderServiceStub }
      ]
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
