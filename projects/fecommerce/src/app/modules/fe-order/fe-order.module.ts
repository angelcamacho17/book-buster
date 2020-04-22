import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeOrderComponent } from './fe-order.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialLibModule } from 'material-lib';
import { FeHeaderModule } from '../fe-header/fe-header.module';



@NgModule({
  declarations: [FeOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeOrderComponent }]),
    MaterialLibModule,
    FeHeaderModule
  ],
  exports: [
    FeOrderComponent
  ]
})
export class FeOrderModule { }
