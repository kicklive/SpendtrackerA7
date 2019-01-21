import { TestBed } from '@angular/core/testing';

import { BudgetlistresolveService } from './budgetlistresolve.service';

describe('BudgetlistresolveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BudgetlistresolveService = TestBed.get(BudgetlistresolveService);
    expect(service).toBeTruthy();
  });
});
