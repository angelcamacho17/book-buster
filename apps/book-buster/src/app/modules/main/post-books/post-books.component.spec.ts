import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBooksComponent } from './post-books.component';

describe('PostBooksComponent', () => {
  let component: PostBooksComponent;
  let fixture: ComponentFixture<PostBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
