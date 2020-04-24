import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeHeaderComponent } from './fe-header.component';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [FeHeaderComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    FeHeaderComponent
  ]
})
export class FeHeaderModule { }
