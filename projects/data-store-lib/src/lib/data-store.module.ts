import { NgModule } from '@angular/core';
import { DataStoreComponent } from './data-store.component';
import { StoreModule } from '@ngrx/store';
import { ordersReducer } from './order/order.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './order/order.effects';
import { HttpClientModule } from '@angular/common/http';
import { OrderService } from './order/order.service';
import { HeaderService } from './header/header.service';
import { headerReducer } from './header/header.reducer';
import { HeaderEffects } from './header/header.effects';


@NgModule({
  declarations: [DataStoreComponent],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({
      order: ordersReducer,
      header: headerReducer
    }),
    EffectsModule.forRoot([
      OrderEffects,
      HeaderEffects
    ]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [
    DataStoreComponent
  ],
  providers: [
    OrderService,
    HeaderService
  ]
})
export class DataStoreModule { }
