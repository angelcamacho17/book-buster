import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOverviewTabletComponent } from './order-overview-tablet.component';

describe('OrderOverviewTabletComponent', () => {
  let component: OrderOverviewTabletComponent;
  let fixture: ComponentFixture<OrderOverviewTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOverviewTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOverviewTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
