import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchMobileComponent } from './customer-search-mobile.component';

describe('CustomerSearchMobileComponent', () => {
  let component: CustomerSearchMobileComponent;
  let fixture: ComponentFixture<CustomerSearchMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSearchMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
