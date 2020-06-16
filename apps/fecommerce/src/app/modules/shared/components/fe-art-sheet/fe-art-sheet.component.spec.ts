import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeArtSheetComponent } from './fe-art-sheet.component';

describe('FeArtSheetComponent', () => {
  let component: FeArtSheetComponent;
  let fixture: ComponentFixture<FeArtSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeArtSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeArtSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
