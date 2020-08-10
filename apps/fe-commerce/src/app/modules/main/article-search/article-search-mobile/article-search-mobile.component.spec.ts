import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleSearchMobileComponent } from './article-search-mobile.component';

describe('ArticleSearchMobileComponent', () => {
  let component: ArticleSearchMobileComponent;
  let fixture: ComponentFixture<ArticleSearchMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleSearchMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleSearchMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
