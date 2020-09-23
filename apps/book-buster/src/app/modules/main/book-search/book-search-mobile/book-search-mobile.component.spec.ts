import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchMobileComponent } from './book-search-mobile.component';

describe('BookSearchMobileComponent', () => {
  let component: BookSearchMobileComponent;
  let fixture: ComponentFixture<BookSearchMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSearchMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
