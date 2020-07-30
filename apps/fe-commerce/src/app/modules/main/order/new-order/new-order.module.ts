import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewOrderRoutingModule } from './new-order-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { SearchModule } from '../../shared/modules/search/search.module';
import { MaterialModule } from '../../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { NewOrderCustomerComponent } from './new-order-customer/new-order-customer.component';
import { NewOrderArticlesComponent } from './new-order-articles/new-order-articles.component';


@NgModule({
  declarations: [
    NewOrderCustomerComponent,
    NewOrderArticlesComponent
  ],
  imports: [
    CommonModule,
    NewOrderRoutingModule,
    SearchModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class NewOrderModule { }
