import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeSearchSmallComponent } from './fe-search-small.component';

describe('FeSearchSmallComponent', () => {
  let component: FeSearchSmallComponent;
  let fixture: ComponentFixture<FeSearchSmallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeSearchSmallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeSearchSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
