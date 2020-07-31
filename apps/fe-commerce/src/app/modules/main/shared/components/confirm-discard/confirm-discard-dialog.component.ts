import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogData {
  title: "";
  message: "";
  firstBtn: "";
  secondBtn: "";

}

@Component({
  selector: 'confirm-discard-dialog',
  templateUrl: './confirm-discard-dialog.component.html',
  styleUrls: ['./confirm-discard-dialog.component.scss']
})
export class ConfirmDiscardDialogComponent implements OnInit {

  constructor(
    private matDialogRef: MatDialogRef<ConfirmDiscardDialogComponent>,
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
