/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { RouterLinkStubDirective } from '../../../testing/router-stub';
import { OAuthService } from 'angular2-oauth2/oauth-service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let oauthServiceStub = {
    hasValidAccessToken: () => { return true },
    hasValidIdToken: () => { return true }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        RouterLinkStubDirective
      ],
      providers: [
        { provide: OAuthService, useValue: oauthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should contain a login button', () => {
    let isAuthorized = oauthServiceStub.hasValidAccessToken() && oauthServiceStub.hasValidIdToken();
    if(!isAuthorized){
      de = fixture.debugElement.query(By.css('button'));
      el = de.nativeElement;

      expect(el).toBeDefined();
    }
  });

  it('should show application title', () => {
    const expectedTitle = 'test title';
    component['authorizedTitle'] = expectedTitle;

    fixture.detectChanges();

    let isAuthorized = oauthServiceStub.hasValidAccessToken() && oauthServiceStub.hasValidIdToken();
    if(isAuthorized){
      de = fixture.debugElement.query(By.css('h1'));
      el = de.nativeElement;
    
      expect(el.innerHTML).toContain(expectedTitle);
    }
  });

});
