import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeNewOrderComponent } from './fe-new-order.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';

@NgModule({
  declarations: [FeNewOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeNewOrderComponent }]),
    MaterialLibModule,
    SharedModule
  ],
  exports: [
    FeNewOrderComponent
  ]
})
export class FeNewOrderModule { }
