import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScannerComponent } from './scanner/scanner.component';
import { MaterialModule } from './material/material.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ZxingComponent } from './scanner/zxing/zxing.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ZXingScannerModule
  ],
  declarations: [
    ScannerComponent,
    ZxingComponent
  ],
  exports: [
    ScannerComponent
  ]
})
export class ScannerModule {}
