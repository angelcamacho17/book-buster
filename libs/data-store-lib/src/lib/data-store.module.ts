import { NgModule } from '@angular/core';
import { DataStoreComponent } from './data-store.component';
import { StoreModule } from '@ngrx/store';
import { RouterStateSerializer } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './order/order.effects';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './order/order.service';
import { reducers } from './data-store.state';
import { CustomSerializer } from './router/router.reducer';
import { CustomerEffects } from './customer/customer.effects';
import { CustomerService } from './customer/customer.service';
import { ArticleEffects } from './article/article.effects';
import { ArticleService } from './article/article.service';

@NgModule({
  declarations: [DataStoreComponent],
  imports: [
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      OrderEffects,
      CustomerEffects,
      ArticleEffects
    ])
  ],
  exports: [
    DataStoreComponent
  ],
  providers: [
    OrderService,
    CustomerService,
    ArticleService,
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ]
})
export class DataStoreModule { }
