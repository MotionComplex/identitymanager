/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuardService } from './auth-guard.service';
import { OAuthService } from 'angular2-oauth2/oauth-service';

describe('AuthGuardService', () => {
  let oauthServiceStub = {
    isLoggedIn: () => { return true },
    hasValidAccessToken: () => { return true },
    hasValidIdToken: () => { return true }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        { provide: OAuthService, useValue: oauthServiceStub }
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should activate routes', inject([AuthGuardService], (service: AuthGuardService) => {
    service['canActivate'] = () => true;

    expect(service.canActivate()).toBe(true)
  }));
});
