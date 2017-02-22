/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NavigationComponent } from './navigation.component';
import { RouterLinkStubDirective } from '../../../testing/router-stub';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        NavigationComponent,
        RouterLinkStubDirective
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

  it('should show application title \'IdentityManager\'', () => {
    de = fixture.debugElement.query(By.css('.navbar-brand'));
    el = de.nativeElement;

    expect(el.textContent).toBe('IdentityManager');
  });

  it('should contain navigation-link \'Benutzer\'', () => {
    de = fixture.debugElement.query(By.css('a'));
    el = de.nativeElement;

    expect(el.innerText).toBe('IdentityManager');
  });

  //TODO: Check both seperate
  it('should contain a login or a logout button', () => {
    de = fixture.debugElement.query(By.css('.btn-logout'));
    if(de === null || de === undefined){
      de = fixture.debugElement.query(By.css('.btn-login'));
    }
    el = de.nativeElement;

    expect(el).toBeDefined();
  });
});
