import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSearchTabletComponent } from './customer-search-tablet.component';

describe('CustomerSearchTabletComponent', () => {
  let component: CustomerSearchTabletComponent;
  let fixture: ComponentFixture<CustomerSearchTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSearchTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSearchTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
