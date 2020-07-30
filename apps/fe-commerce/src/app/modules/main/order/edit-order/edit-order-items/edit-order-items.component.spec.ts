import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderItemsComponent } from './edit-order-items.component';

describe('EditOrderItemsComponent', () => {
  let component: EditOrderItemsComponent;
  let fixture: ComponentFixture<EditOrderItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
