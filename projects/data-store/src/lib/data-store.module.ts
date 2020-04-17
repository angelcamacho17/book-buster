import { NgModule } from '@angular/core';
import { DataStoreComponent } from './data-store.component';
import { StoreModule } from '@ngrx/store';
import { scoreReducer } from './reducers/score.reducer';
import { ShoppingReducer } from './reducers/shopping.reducer';
import { ordersReducer, editOrderReducer } from './order/order.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './order/order.effects';
import { HttpClientModule } from '@angular/common/http';
import { ModelsLibComponent } from 'models-lib';


@NgModule({
  declarations: [DataStoreComponent],
  imports: [
    HttpClientModule,
    StoreModule.forRoot({
      score: scoreReducer,
      shopping: ShoppingReducer,
      order: ordersReducer,
      orderEdit: editOrderReducer
    }),
    EffectsModule.forRoot([OrderEffects]),
    StoreDevtoolsModule.instrument()
  ],
  exports: [
    DataStoreComponent
  ]
})
export class DataStoreModule { }
