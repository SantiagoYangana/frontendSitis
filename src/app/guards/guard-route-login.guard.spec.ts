import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { guardRouteLoginGuard } from './guard-route-login.guard';

describe('guardRouteLoginGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guardRouteLoginGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
