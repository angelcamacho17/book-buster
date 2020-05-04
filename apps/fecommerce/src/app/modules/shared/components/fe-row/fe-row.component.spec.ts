import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeRowComponent } from './fe-row.component';

describe('FeRowComponent', () => {
  let component: FeRowComponent;
  let fixture: ComponentFixture<FeRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
