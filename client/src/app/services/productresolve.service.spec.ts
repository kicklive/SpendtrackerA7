import { TestBed } from '@angular/core/testing';

import { ProductresolveService } from './productresolve.service';

describe('ProductresolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductresolveService = TestBed.get(ProductresolveService);
    expect(service).toBeTruthy();
  });
});
