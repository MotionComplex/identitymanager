/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Routes } from '@angular/router';

import { NavigationComponent } from './navigation.component';
import { RouterLinkStubDirective } from '../../../testing/router-stub';
import { OAuthService } from 'angular2-oauth2/oauth-service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    const oauthServiceStub = {
      isLoggedIn: () => { return true; },
      hasValidAccessToken: () => { return true; },
      hasValidIdToken: () => { return true; }
    };

    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        RouterLinkStubDirective
      ],
      providers: [
            { provide: OAuthService, useValue: oauthServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show title', () => {
    const expectedTitle = 'test title';
    component['pageTitle'] = expectedTitle;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.navbar-brand'));
    el = de.nativeElement;

    expect(el.textContent).toBe(expectedTitle);
  });

  it('should show navigation-links', () => {
    const expectedRoutes =
    [
      {
        path: 'path1',
        data: {
          title: 'title1',
          relevantForNav: true
        }
      }
    ];

    component['routes'] = expectedRoutes;

    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.nav-link'));
    el = de.nativeElement;

    expect(el.innerText).toBe(expectedRoutes[0].data['title']);
  });

  it('should show a login button', () => {
    component['isLoggedIn'] = () => false;

    fixture.detectChanges();
    de = fixture.debugElement.query(By.css('.btn-login'));
    el = de.nativeElement;

    expect(el).toBeDefined();
  });

  it('should show a logout button', () => {
    component['isLoggedIn'] = () => true;
    
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('.btn-logout'));
    el = de.nativeElement;

    expect(el).toBeDefined();
  });
});
