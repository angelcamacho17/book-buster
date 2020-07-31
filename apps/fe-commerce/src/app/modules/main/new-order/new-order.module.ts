import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderRoutingModule } from './new-order-routing.module';
import { NewOrderComponent } from './new-order.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';


@NgModule({
  declarations: [
    NewOrderComponent,
  ],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class NewOrderModule { }
