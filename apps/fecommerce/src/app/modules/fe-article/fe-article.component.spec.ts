import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeArticleComponent } from './fe-article.component';

describe('FeArticleComponent', () => {
  let component: FeArticleComponent;
  let fixture: ComponentFixture<FeArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
