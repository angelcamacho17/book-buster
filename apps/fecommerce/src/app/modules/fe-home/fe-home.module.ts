import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeHomeComponent } from './fe-home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/modules/material/material.module';



@NgModule({
  declarations: [FeHomeComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([{ path: '', component: FeHomeComponent }]),
    MaterialModule,
    SharedModule
  ],
  exports: [
    FeHomeComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FeHomeModule { }
