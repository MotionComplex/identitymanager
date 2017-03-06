/* tslint:disable:no-unused-variable */
// angular imports
import { TestBed, async, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

// custom services
import { UserService } from './user.service';
import { WebConfigLoaderService } from '../web-config-loader/web-config-loader.service';

// custom models
import { WebConfig } from '../../models/web-config/web-config';

describe('UserService', () => {
  const webConfig: WebConfig = new WebConfig('localhost:9999', 'localhost:4200', true, 'clientid', 'scope');
  const webConfigLoaderServiceStub = {
    getWebConifg: () => { 
      return webConfig;
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: WebConfigLoaderService, useValue: webConfigLoaderServiceStub }
      ],
      imports: [
        HttpModule
      ]
    });
  });

  it('should inject the service', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
