import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeComponentComponent } from './fe-component.component';

describe('FeComponentComponent', () => {
  let component: FeComponentComponent;
  let fixture: ComponentFixture<FeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
