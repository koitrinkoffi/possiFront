import { TestBed } from '@angular/core/testing';

import { UnavailabilityService } from './unavailability.service';

describe('UnavailabilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnavailabilityService = TestBed.get(UnavailabilityService);
    expect(service).toBeTruthy();
  });
});
