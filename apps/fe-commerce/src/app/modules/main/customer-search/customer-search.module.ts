import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { CustomerSearchComponent } from './customer-search.component';
import { CustomerSearchRoutingModule } from './customer-search-routing.module';

@NgModule({
  declarations: [CustomerSearchComponent],
  imports: [
    CommonModule,
    CustomerSearchRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class CustomerSearchModule { }
