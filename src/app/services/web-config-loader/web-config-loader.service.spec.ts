/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebConfigLoaderService } from './web-config-loader.service';
import { HttpModule, Http } from '@angular/http';

describe('WebConfigLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebConfigLoaderService],
      imports: [
        HttpModule
      ]
    });
  });

  it('should ...', inject([WebConfigLoaderService], (service: WebConfigLoaderService) => {
    expect(service).toBeTruthy();
  }));
});