import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDetailTabletComponent } from './article-detail-tablet.component';

describe('ArticleDetailTabletComponent', () => {
  let component: ArticleDetailTabletComponent;
  let fixture: ComponentFixture<ArticleDetailTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleDetailTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDetailTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
