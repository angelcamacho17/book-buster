import { async, TestBed } from '@angular/core/testing';
import { ScannerModule } from './scanner.module';

describe('ScannerModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ScannerModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ScannerModule).toBeDefined();
  });
});
