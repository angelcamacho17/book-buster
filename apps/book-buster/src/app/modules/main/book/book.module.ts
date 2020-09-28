import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    SharedModule,
    TranslatePipeModule,
    MaterialModule
  ]
})
export class BookModule { }
