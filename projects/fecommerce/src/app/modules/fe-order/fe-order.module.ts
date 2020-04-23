import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeOrderComponent } from './fe-order.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [FeOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeOrderComponent }]),
    MaterialLibModule,
    SharedModule
  ],
  exports: [
    FeOrderComponent
  ]
})
export class FeOrderModule { }
