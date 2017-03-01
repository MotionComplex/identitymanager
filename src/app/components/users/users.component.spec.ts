/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

// 3rd-party libraries
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// custom services
import { UserService } from '../../services/users/user.service';
import { WebConfigLoaderService } from '../../services/web-config-loader/web-config-loader.service';

// custom models
import { UserAccount } from '../../models/users/user-account';
import { WebConfig } from '../../models/web-config/web-config';

// components
import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userAccounts: UserAccount[] = [
    new UserAccount('000','ua','User','Account','identifier','ua@ua.com','2017-01-01','2017-12-12')
  ];
  let webConfig: WebConfig = new WebConfig('localhost:9999', 'localhost:4200', true, 'clientid', 'scope')
  let userServiceStub = {
    getUsers: () => { return userAccounts }
  };
  let webConfigLoaderServiceStub = {
    getWebConifg: () => { 
      return webConfig;
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        FormsModule,
        HttpModule,
        RouterTestingModule,
        ModalModule.forRoot(),
        BootstrapModalModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: WebConfigLoaderService, useValue: webConfigLoaderServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user accounts', () => {
    expect(userServiceStub.getUsers()).toBe(userAccounts);
  });

  it('should find user accounts via search function', () => {
    const searchString = 'ua1';
    let users: UserAccount[] = [
      new UserAccount('000','ua','User','Account','identifier','ua@ua.com','2017-01-01','2017-12-12'),
      new UserAccount('111','ua1','User1','Account','identifier1','ua@ua.com','2017-01-01','2017-12-12'),
      new UserAccount('222','ua2','User2','Account','identifier2','ua@ua.com','2017-01-01','2017-12-12')
    ];
    let expectedUsers: UserAccount[] = [
      new UserAccount('111','ua1','User1','Account','identifier1','ua@ua.com','2017-01-01','2017-12-12')
    ];

    component['users'] = users;
    component['filteredUsers'] = component['users'];
    component['searchString'] = searchString;

    fixture.detectChanges();

    component['searchUsers']();

    expect(component['filteredUsers']).toEqual(expectedUsers);
  })
});
