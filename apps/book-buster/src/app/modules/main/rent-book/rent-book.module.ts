import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentBookComponent } from './rent-book.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data';



@NgModule({
  declarations: [RentBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: RentBookComponent }]),
    SharedModule,
    MaterialModule,
    TranslatePipeModule

  ]
})
export class RentBookModule { }
