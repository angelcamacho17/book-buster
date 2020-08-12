import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemsTabletComponent } from './order-items-tablet.component';

describe('OrderItemsTabletComponent', () => {
  let component: OrderItemsTabletComponent;
  let fixture: ComponentFixture<OrderItemsTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemsTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemsTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
