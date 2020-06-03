import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCardComponent } from './fe-card.component';

describe('FeCardComponent', () => {
  let component: FeCardComponent;
  let fixture: ComponentFixture<FeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
