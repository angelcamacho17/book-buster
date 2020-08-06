import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeResolver } from './home/home.resolver';
import { OrderOverviewResolver } from './order-overview/order-overview.resolver';
import { OrderItemsResolver } from './order-items/order-items.resolver';
import { CustomerSearchResolver } from './customer-search/customer-search.resolver';
import { ArticleDetailResolver } from './article-detail/article-detail.resolver';
import { ArticleSearchResolver } from './article-search/article-search.resolver';
import { MainComponent } from './main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutService } from './shared/services/layout.service';

@NgModule({
  imports: [
    CommonModule, 
    MainRoutingModule,
    SharedModule
  ],
  providers: [
    LayoutService,
    HomeResolver,
    OrderOverviewResolver,
    OrderItemsResolver,
    CustomerSearchResolver,
    ArticleSearchResolver,
    ArticleDetailResolver
  ],
  declarations: [MainComponent]
})
export class MainModule { }
