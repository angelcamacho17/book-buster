import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: "";
  message: "";
}

@Component({
  selector: 'fe-confirm-discard-dialog',
  templateUrl: './fe-confirm-discard-dialog.component.html',
  styleUrls: ['./fe-confirm-discard-dialog.component.scss']
})
export class FeConfirmDiscardDialogComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<FeConfirmDiscardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  onConfirm() {
    this.matDialogRef.close(true);
  }
  
  onDiscard() {
    this.matDialogRef.close(false);
  }
}
