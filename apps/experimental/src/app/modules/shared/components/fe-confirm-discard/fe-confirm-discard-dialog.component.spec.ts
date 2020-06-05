import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeConfirmDiscardDialogComponent } from './fe-confirm-discard-dialog.component';

describe('FeConfirmDiscardComponent', () => {
  let component: FeConfirmDiscardDialogComponent;
  let fixture: ComponentFixture<FeConfirmDiscardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeConfirmDiscardDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeConfirmDiscardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
