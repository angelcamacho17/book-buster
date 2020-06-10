import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeNewOrderComponent } from './fe-new-order.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/modules/material/material.module';
import { ClickOutsideModule } from 'ng-click-outside';

@NgModule({
  declarations: [FeNewOrderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeNewOrderComponent }]),
    MaterialModule,
    SharedModule,
    ClickOutsideModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeNewOrderModule { }
