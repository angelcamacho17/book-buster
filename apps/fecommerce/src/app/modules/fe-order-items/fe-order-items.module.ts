import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeOrderItemsComponent } from './fe-order-items.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';

@NgModule({
  declarations: [FeOrderItemsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeOrderItemsComponent
      }
    ]),
    MaterialModule,
    DragDropModule,
    ClickOutsideModule,
    TranslatePipeModule
  ]
})
export class FeOrderItemsModule { }
