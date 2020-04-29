import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeSearchComponent } from './fe-search.component';

describe('FeSearchComponent', () => {
  let component: FeSearchComponent;
  let fixture: ComponentFixture<FeSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
