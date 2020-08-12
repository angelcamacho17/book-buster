import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsMobileComponent } from './order-items-mobile.component';

describe('OrderItemsMobileComponent', () => {
  let component: OrderItemsMobileComponent;
  let fixture: ComponentFixture<OrderItemsMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemsMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
