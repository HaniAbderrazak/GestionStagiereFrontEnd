import { TestBed } from '@angular/core/testing';

import { authorizationGuard } from './authorization.guard';

describe('authorizationGuard', () => {
  let guard: authorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(authorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});