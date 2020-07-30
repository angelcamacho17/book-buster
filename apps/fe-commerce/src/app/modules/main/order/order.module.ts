import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOrderResolver } from './edit-order/edit-order.resolver';
import { OrderItemsResolver } from './order-items/order-items.resolver';
import { NewOrderResolver } from './new-order/new-order.resolver';
import { SearchModule } from '../shared/modules/search/search.module';
import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SearchModule,
    OrderRoutingModule,
    SharedModule
  ],
  providers: [
    EditOrderResolver,
    NewOrderResolver,
    OrderItemsResolver
  ]
})
export class OrderModule { }
