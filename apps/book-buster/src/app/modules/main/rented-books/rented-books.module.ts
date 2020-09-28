import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentedBooksComponent } from './rented-books.component';
import { RentedBooksRoutingModule } from './rented-books-routing.module';



@NgModule({
  declarations: [RentedBooksComponent],
  imports: [
    CommonModule,
    RentedBooksRoutingModule
  ]
})
export class RentedBooksModule { }
