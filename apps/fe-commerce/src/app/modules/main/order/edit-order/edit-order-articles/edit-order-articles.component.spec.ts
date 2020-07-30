import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrderArticlesComponent } from './edit-order-articles.component';

describe('EditOrderArticlesComponent', () => {
  let component: EditOrderArticlesComponent;
  let fixture: ComponentFixture<EditOrderArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrderArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrderArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
