import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderCustomerComponent } from './new-order-customer.component';

describe('NewOrderCustomerComponent', () => {
  let component: NewOrderCustomerComponent;
  let fixture: ComponentFixture<NewOrderCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
