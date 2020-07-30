import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClickOutsideModule } from 'ng-click-outside';
import { MaterialModule } from '../../../material/material.module';
// import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { OrderItemsComponent } from './order-items.component'

@NgModule({
  declarations: [OrderItemsComponent],
  imports: [
    CommonModule,
    SharedModule,
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: OrderItemsComponent
    //   }
    // ]),
    MaterialModule,
    DragDropModule,
    ClickOutsideModule,
    // TranslatePipeModule
  ]
})
export class OrderItemsModule { }
