import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelsLibComponent } from './models-lib.component';

describe('ModelsLibComponent', () => {
  let component: ModelsLibComponent;
  let fixture: ComponentFixture<ModelsLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelsLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelsLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
