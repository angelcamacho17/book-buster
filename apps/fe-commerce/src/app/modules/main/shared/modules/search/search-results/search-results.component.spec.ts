import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeSearchResultsComponent } from './fe-search-results.component';

describe('FeSearchResultsComponent', () => {
  let component: FeSearchResultsComponent;
  let fixture: ComponentFixture<FeSearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeSearchResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
