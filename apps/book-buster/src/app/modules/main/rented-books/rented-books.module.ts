import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentedBooksComponent } from './rented-books.component';
import { RentedBooksRoutingModule } from './rented-books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';



@NgModule({
  declarations: [RentedBooksComponent],
  imports: [
    CommonModule,
    RentedBooksRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class RentedBooksModule { }
