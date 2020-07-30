import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrderArticlesComponent } from './new-order-articles.component';

describe('NewOrderArticlesComponent', () => {
  let component: NewOrderArticlesComponent;
  let fixture: ComponentFixture<NewOrderArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOrderArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrderArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
