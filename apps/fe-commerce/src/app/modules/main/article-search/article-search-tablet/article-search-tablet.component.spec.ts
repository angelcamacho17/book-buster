import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSearchTabletComponent } from './article-search-tablet.component';

describe('ArticleSearchTabletComponent', () => {
  let component: ArticleSearchTabletComponent;
  let fixture: ComponentFixture<ArticleSearchTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSearchTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSearchTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
