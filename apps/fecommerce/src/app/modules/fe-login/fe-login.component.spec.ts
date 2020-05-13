import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeLoginComponent } from './fe-login.component';

describe('FeLoginComponent', () => {
  let component: FeLoginComponent;
  let fixture: ComponentFixture<FeLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
