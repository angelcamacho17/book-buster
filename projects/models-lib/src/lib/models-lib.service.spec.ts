import { TestBed } from '@angular/core/testing';

import { ModelsLibService } from './models-lib.service';

describe('ModelsLibService', () => {
  let service: ModelsLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelsLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
