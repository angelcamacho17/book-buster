import { async, TestBed } from '@angular/core/testing';
import { DataStoreLibModule } from './data-store-lib.module';

describe('DataStoreLibModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DataStoreLibModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(DataStoreLibModule).toBeDefined();
  });
});
