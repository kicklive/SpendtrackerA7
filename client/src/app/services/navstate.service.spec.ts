import { TestBed } from '@angular/core/testing';

import { NavstateService } from './navstate.service';

describe('NavstateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavstateService = TestBed.get(NavstateService);
    expect(service).toBeTruthy();
  });
});
