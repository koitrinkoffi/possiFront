import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

describe('PersonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
