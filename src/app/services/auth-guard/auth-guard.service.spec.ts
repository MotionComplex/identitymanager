/* tslint:disable:no-unused-variable */
// angular imports
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// 3rd-party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// custom services
import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuardService,
        OAuthService
      ],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should inject the service', inject([AuthGuardService], (service: AuthGuardService) => {
    expect(service).toBeTruthy();
  }));

  it('should activate routes', inject([AuthGuardService], (service: AuthGuardService) => {
    service['oauthService'].hasValidAccessToken = () => { return true; };
    service['oauthService'].hasValidIdToken = () => { return true; };

    expect(service.canActivate()).toBe(true);
  }));

  it('should deactivate routes', inject([AuthGuardService], (service: AuthGuardService) => {
    service['oauthService'].hasValidAccessToken = () => { return false; };
    service['oauthService'].hasValidIdToken = () => { return false; };

    expect(service.canActivate()).toBe(false);
  }));
});
