/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Response } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';

// 3rd-party libraries
import { Observable } from 'rxjs/Observable';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalRef, NgbDatepicker, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

// custom services
import { UserService } from '../../../services/users/user.service';
import { WebConfigLoaderService } from '../../../services/web-config-loader/web-config-loader.service';
import { GuidValidatorService } from '../../../services/guid-validator/guid-validator.service';

// custom models
import { UserAccount } from '../../../models/users/user-account';
import { WebConfig } from '../../../models/web-config/web-config';
import { Mandator } from '../../../models/mandators/mandator';

// components
import { UserDetailComponent } from './user-detail.component';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userAccount: UserAccount = new UserAccount('000','ua','User','Account','identifier','ua@ua.com','2017-01-01','2017-12-12');
  let mandators: Mandator[] = [ new Mandator('000', 'mandator', 'Mandator', false), new Mandator('111', 'mandator1', 'Mandator1', false) ]
  let webConfig: WebConfig = new WebConfig('localhost:9999', 'localhost:4200', true, 'clientid', 'scope');
  let userServiceStub = {
    getUserAccount: () => { return userAccount; },
    addOrUpdateUser: () => { },
    getMandators: () => { return mandators; }
  };
  let webConfigLoaderServiceStub = {
    getWebConifg: () => { 
      return webConfig;
    }
  };

  beforeEach(async(() => {  
    TestBed.configureTestingModule({
      declarations: [ UserDetailComponent ],
      imports: [
        HttpModule,
        FormsModule,
        RouterTestingModule,
        NgbModule.forRoot(),
        ModalModule.forRoot(),
        BootstrapModalModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceStub },
        { provide: WebConfigLoaderService, useValue: webConfigLoaderServiceStub },
        GuidValidatorService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user account data', () => {
    const assignedMandator = new Mandator('000', 'title', 'name', true);
    component['loadUserAccountData']();
    component['userAccount'] = userServiceStub.getUserAccount();

    fixture.detectChanges();

    expect(component['userAccount']).toEqual(userAccount);
  });

  it('should get all mandators', () => {
    component['mandators'] = userServiceStub.getMandators();
    component['loadMandators']();

    fixture.detectChanges();

    expect(component['mandators']).toEqual(mandators);
  });

  it('should create a new user', () => {
    component['createNewUserAccount']();

    fixture.detectChanges();

    expect(component['currentUid']).not.toBeNull();
    expect(component['emptyGuid']).not.toEqual(component['currentUid']);
  });
});
