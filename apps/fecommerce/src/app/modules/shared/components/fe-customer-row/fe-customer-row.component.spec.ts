import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCustomerRowComponent } from './fe-customer-row.component';

describe('FeCustomerRowComponent', () => {
  let component: FeCustomerRowComponent;
  let fixture: ComponentFixture<FeCustomerRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeCustomerRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeCustomerRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
