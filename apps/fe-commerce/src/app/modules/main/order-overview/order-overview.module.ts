import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderOverviewComponent } from './order-overview.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { OrderOverviewRoutingModule } from './order-overview-routing.module';



@NgModule({
  declarations: [OrderOverviewComponent],
  imports: [
    CommonModule,
    OrderOverviewRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class OrderOverviewModule { }
