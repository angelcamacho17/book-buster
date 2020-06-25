import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeLoginComponent } from './fe-login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';



@NgModule({
  declarations: [FeLoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: FeLoginComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class FeLoginModule { }
