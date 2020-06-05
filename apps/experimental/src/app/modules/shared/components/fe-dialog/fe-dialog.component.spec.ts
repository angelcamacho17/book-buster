import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeDialogComponent } from './fe-dialog.component';

describe('FeDialogComponent', () => {
  let component: FeDialogComponent;
  let fixture: ComponentFixture<FeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
