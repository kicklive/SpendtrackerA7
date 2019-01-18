import { TestBed } from '@angular/core/testing';

import { ItemsearchService } from './itemsearch.service';

describe('ItemsearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemsearchService = TestBed.get(ItemsearchService);
    expect(service).toBeTruthy();
  });
});
