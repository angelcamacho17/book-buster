import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner/scanner.component';
import { MaterialModule } from './material/material.module';
import { ZScanComponent } from './scanner/z-scan/z-scan.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    ScannerComponent, ZScanComponent
  ],
  exports: [
    ScannerComponent,
    ZScanComponent
  ]
})
export class ScannerModule {}
