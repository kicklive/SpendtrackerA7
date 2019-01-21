import { TestBed } from '@angular/core/testing';

import { DataresolveService } from './dataresolve.service';

describe('DataresolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DataresolveService = TestBed.get(DataresolveService);
    expect(service).toBeTruthy();
  });
});
