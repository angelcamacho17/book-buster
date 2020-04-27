import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeArticleRowComponent } from './fe-article-row.component';

describe('FeArticleRowComponent', () => {
  let component: FeArticleRowComponent;
  let fixture: ComponentFixture<FeArticleRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeArticleRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeArticleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
