import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeOrderComponent } from './fe-order.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FeHeaderModule } from '../fe-header/fe-header.module';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [FeOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeOrderComponent }]),
    MaterialModule,
    FeHeaderModule
  ],
  exports: [
    FeOrderComponent
  ]
})
export class FeOrderModule { }
