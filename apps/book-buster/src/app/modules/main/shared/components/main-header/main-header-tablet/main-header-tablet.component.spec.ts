import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderTabletComponent } from './main-header-tablet.component';

describe('MainHeaderTabletComponent', () => {
  let component: MainHeaderTabletComponent;
  let fixture: ComponentFixture<MainHeaderTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHeaderTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
