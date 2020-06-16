import { Component, OnInit } from '@angular/core';
import { ScannerComponent } from '../scanner.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fecommerce-workspace-z-scan',
  templateUrl: './z-scan.component.html',
  styleUrls: ['./z-scan.component.scss']
})
export class ZScanComponent extends ScannerComponent implements OnInit {

  constructor(snackBar: MatSnackBar) {
    super(snackBar);
    this.name = 'Z-Scan'
  }

  ngOnInit(): void {
    this._snackBar.open('Opening ' + this.name ,'Great!',
      {
        duration: 5000,
        verticalPosition: 'top'
      }
    )
  }

}
