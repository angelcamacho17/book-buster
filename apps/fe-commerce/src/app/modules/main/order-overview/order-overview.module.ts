import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderOverviewComponent } from './order-overview.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { OrderOverviewRoutingModule } from './order-overview-routing.module';
import { OrderOverviewTabletComponent } from './order-overview-tablet/order-overview-tablet.component';
import { OrderOverviewMobileComponent } from './order-overview-mobile/order-overview-mobile.component';
import { OrderItemsModule } from '../order-items/order-items.module';
import { MatDialogRef } from '@angular/material/dialog';

@NgModule({
  declarations: [
    OrderOverviewComponent,
    OrderOverviewTabletComponent,
    OrderOverviewMobileComponent],
  imports: [
    CommonModule,
    OrderOverviewRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule,
    OrderItemsModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    }
 ],

})
export class OrderOverviewModule { }
