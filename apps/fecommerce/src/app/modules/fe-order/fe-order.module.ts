import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeOrderComponent } from './fe-order.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';



@NgModule({
  declarations: [FeOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslatePipeModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeOrderComponent
      },
      {
        path: 'edit',
        component: FeOrderComponent,
        data: { animation: 'orderedit' },
      }
    ]),
    MaterialModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeOrderModule { }
