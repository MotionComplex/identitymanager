/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WebConfigLoaderService } from './web-config-loader.service';

describe('WebConfigLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WebConfigLoaderService]
    });
  });

  it('should ...', inject([WebConfigLoaderService], (service: WebConfigLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
