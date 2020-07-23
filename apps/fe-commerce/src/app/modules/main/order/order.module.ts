import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class OrderModule { }
