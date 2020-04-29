import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeArticleDetailComponent } from './fe-article-detail.component';

describe('FeArticleDetailComponent', () => {
  let component: FeArticleDetailComponent;
  let fixture: ComponentFixture<FeArticleDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeArticleDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeArticleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
