import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeOrderItemsComponent } from './fe-order-items.component';

describe('FeOrderItemsComponent', () => {
  let component: FeOrderItemsComponent;
  let fixture: ComponentFixture<FeOrderItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeOrderItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
