import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { OrderItemsComponent } from './order-items.component';
import { OrderItemsRoutingModule } from './order-items-routing.module';
import { OrderItemsTabletComponent } from './order-items-tablet/order-items-tablet.component';
import { OrderItemsMobileComponent } from './order-items-mobile/order-items-mobile.component';

@NgModule({
  declarations: [OrderItemsComponent, OrderItemsTabletComponent, OrderItemsMobileComponent],
  imports: [
    CommonModule,
    SharedModule,
    OrderItemsRoutingModule,
    MaterialModule,
    DragDropModule,
    ClickOutsideModule,
    TranslatePipeModule
  ],
  exports: [
    OrderItemsTabletComponent
  ]
})
export class OrderItemsModule { }
