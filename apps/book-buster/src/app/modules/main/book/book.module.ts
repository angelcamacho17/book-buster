import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book-routing.module';



@NgModule({
  declarations: [BookComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
