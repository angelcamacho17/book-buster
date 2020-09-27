import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentBooksComponent } from './rent-books.component';
import { RentBooksRoutingModule } from './rent-books-routing.module';



@NgModule({
  declarations: [RentBooksComponent],
  imports: [
    CommonModule,
    RentBooksRoutingModule
  ]
})
export class RentBooksModule { }
