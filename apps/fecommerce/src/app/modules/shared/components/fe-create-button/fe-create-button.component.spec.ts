import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeCreateButtonComponent } from './fe-create-button.component';

describe('FeCreateButtonComponent', () => {
  let component: FeCreateButtonComponent;
  let fixture: ComponentFixture<FeCreateButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeCreateButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeCreateButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
