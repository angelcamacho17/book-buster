import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBookComponent } from './create-book.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateBookComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: CreateBookComponent }]),
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class CreateBookModule { }
