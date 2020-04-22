import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeHeaderComponent } from './fe-header.component';
import { MaterialLibModule } from 'material-lib';



@NgModule({
  declarations: [FeHeaderComponent],
  imports: [
    CommonModule,
    MaterialLibModule
  ],
  exports: [
    FeHeaderComponent
  ]
})
export class FeHeaderModule { }
