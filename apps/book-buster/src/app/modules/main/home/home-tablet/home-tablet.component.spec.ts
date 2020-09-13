import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabletComponent } from './home-tablet.component';

describe('HomeTabletComponent', () => {
  let component: HomeTabletComponent;
  let fixture: ComponentFixture<HomeTabletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
