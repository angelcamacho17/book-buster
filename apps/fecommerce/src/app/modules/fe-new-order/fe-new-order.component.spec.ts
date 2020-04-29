import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeNewOrderComponent } from './fe-new-order.component';

describe('FeNewOrderComponent', () => {
  let component: FeNewOrderComponent;
  let fixture: ComponentFixture<FeNewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeNewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeNewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
