import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderItemsComponent } from './new-order-items.component';

describe('NewOrderItemsComponent', () => {
  let component: NewOrderItemsComponent;
  let fixture: ComponentFixture<NewOrderItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
