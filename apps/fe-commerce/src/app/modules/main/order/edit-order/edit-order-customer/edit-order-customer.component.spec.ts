import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderCustomerComponent } from './edit-order-customer.component';

describe('EditOrderCustomerComponent', () => {
  let component: EditOrderCustomerComponent;
  let fixture: ComponentFixture<EditOrderCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
