import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'fecommerce-workspace-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {

  public name: string;

  constructor(public _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

}
