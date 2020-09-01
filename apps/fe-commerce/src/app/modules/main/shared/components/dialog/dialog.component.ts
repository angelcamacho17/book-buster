import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title?: string;
  msg?: string;
  firstButton?: string;
  secondButton?: string;
  buttonColor?: string;
}

@Component({
  selector: 'dialog-wnd',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
     }

  /**
   * Click outsite.
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Click in close button.
   * @param result
   */
  onClick(result: string): void {
    this.dialogRef.close({result});
  }

  ngOnInit(): void {
  }

}
