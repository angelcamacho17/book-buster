import { NgModule } from '@angular/core';
import { DataStoreComponent } from './data-store.component';
import { StoreModule } from '@ngrx/store';
import { scoreReducer } from './reducers/score.reducer';



@NgModule({
  declarations: [DataStoreComponent],
  imports: [
    StoreModule.forRoot({
      score: scoreReducer
    })
  ],
  exports: [DataStoreComponent]
})
export class DataStoreModule { }
