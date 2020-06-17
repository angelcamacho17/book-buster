import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZxingComponent } from './zxing.component';

describe('ZxingComponent', () => {
  let component: ZxingComponent;
  let fixture: ComponentFixture<ZxingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZxingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZxingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
