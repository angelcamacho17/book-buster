import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { NewOrderModule } from './new-order/new-order.module';
import { SharedModule } from './shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeResolver } from './home/home.resolver';
import { EditOrderResolver } from './edit-order/edit-order.resolver';
import { OrderItemsResolver } from './order-items/order-items.resolver';
import { CustomerSearchResolver } from './customer-search/customer-search.resolver';
import { ArticleSearchResolver } from './article-search/article-search.resolver';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  providers: [
    HomeResolver,
    EditOrderResolver,
    OrderItemsResolver,
    CustomerSearchResolver,
    ArticleSearchResolver
  ]
})
export class MainModule { }
