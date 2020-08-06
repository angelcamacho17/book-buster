import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewMobileComponent } from './order-overview-mobile.component';

describe('OrderOverviewMobileComponent', () => {
  let component: OrderOverviewMobileComponent;
  let fixture: ComponentFixture<OrderOverviewMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOverviewMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
