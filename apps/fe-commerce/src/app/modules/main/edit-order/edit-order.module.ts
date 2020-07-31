import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditOrderComponent } from './edit-order.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { EditOrderRoutingModule } from './edit-order-routing.module';



@NgModule({
  declarations: [EditOrderComponent],
  imports: [
    CommonModule,
    EditOrderRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class EditOrderModule { }
