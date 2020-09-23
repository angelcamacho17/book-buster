import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookSearchTabletComponent } from './book-search-tablet.component';

describe('BookSearchTabletComponent', () => {
  let component: BookSearchTabletComponent;
  let fixture: ComponentFixture<BookSearchTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookSearchTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookSearchTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
