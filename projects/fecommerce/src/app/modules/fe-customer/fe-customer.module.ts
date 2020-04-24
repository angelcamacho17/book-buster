import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCustomerComponent } from './fe-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [FeCustomerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeCustomerComponent }]),
    MaterialModule,
    SharedModule
  ],
  exports: [
    FeCustomerComponent
  ]
})
export class FeCustomerModule { }
