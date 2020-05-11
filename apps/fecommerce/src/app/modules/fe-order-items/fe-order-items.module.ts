import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeOrderItemsComponent } from './fe-order-items.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [FeOrderItemsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([{ path: '', component: FeOrderItemsComponent }]),
    MaterialModule
  ]
})
export class FeOrderItemsModule { }
