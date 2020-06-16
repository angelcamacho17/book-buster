import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZScanComponent } from './z-scan.component';

describe('ZScanComponent', () => {
  let component: ZScanComponent;
  let fixture: ComponentFixture<ZScanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZScanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZScanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
