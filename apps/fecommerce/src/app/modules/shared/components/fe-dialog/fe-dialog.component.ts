import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  msg: string;
  firstButton: string;
  secondButton: string;
}


@Component({
  selector: 'fe-dialog',
  templateUrl: './fe-dialog.component.html',
  styleUrls: ['./fe-dialog.component.scss']
})
export class FeDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(result: string): void {
    this.dialogRef.close({result});
  }


  ngOnInit(): void {
  }

}