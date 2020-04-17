import { TestBed } from '@angular/core/testing';

import { MaterialLibService } from './material-lib.service';

describe('MaterialLibService', () => {
  let service: MaterialLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
