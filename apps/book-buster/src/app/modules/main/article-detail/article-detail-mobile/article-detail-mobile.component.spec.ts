import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailMobileComponent } from './article-detail-mobile.component';

describe('ArticleDetailMobileComponent', () => {
  let component: ArticleDetailMobileComponent;
  let fixture: ComponentFixture<ArticleDetailMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
