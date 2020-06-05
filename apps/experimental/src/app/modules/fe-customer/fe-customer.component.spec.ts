import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCustomerComponent } from './fe-customer.component';

describe('FeCustomerComponent', () => {
  let component: FeCustomerComponent;
  let fixture: ComponentFixture<FeCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
