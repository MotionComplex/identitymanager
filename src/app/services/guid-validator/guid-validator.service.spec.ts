/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GuidValidatorService } from './guid-validator.service';

describe('GuidValidatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GuidValidatorService]
    });
  });

  it('should inject the service', inject([GuidValidatorService], (service: GuidValidatorService) => {
    expect(service).toBeTruthy();
  }));
});
