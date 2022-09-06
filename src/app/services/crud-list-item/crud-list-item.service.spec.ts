import { TestBed } from '@angular/core/testing';

import { CrudListItemService } from './crud-list-item.service';

describe('CrudListItemService', () => {
  let service: CrudListItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudListItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
