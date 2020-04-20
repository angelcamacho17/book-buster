import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeOrderComponent } from './fe-order.component';

describe('FeOrderComponent', () => {
  let component: FeOrderComponent;
  let fixture: ComponentFixture<FeOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
