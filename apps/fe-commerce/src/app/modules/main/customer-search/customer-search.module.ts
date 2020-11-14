import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data';
import { CustomerSearchComponent } from './customer-search.component';
import { CustomerSearchRoutingModule } from './customer-search-routing.module';
import { CustomerSearchMobileComponent } from './customer-search-mobile/customer-search-mobile.component';
import { CustomerSearchTabletComponent } from './customer-search-tablet/customer-search-tablet.component';

@NgModule({
  declarations: [CustomerSearchComponent, CustomerSearchMobileComponent, CustomerSearchTabletComponent],
  imports: [
    CommonModule,
    CustomerSearchRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule,
  ]
})
export class CustomerSearchModule { }
