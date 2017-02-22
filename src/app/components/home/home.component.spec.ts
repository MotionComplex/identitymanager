/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { RouterLinkStubDirective } from '../../../testing/router-stub';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        RouterLinkStubDirective
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
  
  //TODO: Set authorization state if auth-service is available: check for !isLoggedIn()
  it('should contain a login button', () => {
    if(component['isLoggedIn()'] === false){
      de = fixture.debugElement.query(By.css('button'));
      el = de.nativeElement;

      expect(el).toBeDefined();
    }
  });

  //TODO: Set authorization state if auth-service is available: check for isLoggedIn()
  it('should show application title \'Welcome to the Client-App 2017\'', () => {
    if(component['isLoggedIn()']){
      de = fixture.debugElement.query(By.css('h1'));
      el = de.nativeElement;
    
      expect(el.textContent).toBe('Welcome to the Client-App 2017');
    }
  });

});
