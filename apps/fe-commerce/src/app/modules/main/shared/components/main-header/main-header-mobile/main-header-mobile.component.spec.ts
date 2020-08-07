import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderMobileComponent } from './main-header-mobile.component';

describe('MainHeaderMobileComponent', () => {
  let component: MainHeaderMobileComponent;
  let fixture: ComponentFixture<MainHeaderMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainHeaderMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainHeaderMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
