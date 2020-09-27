import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostBooksComponent } from './post-books.component';
import { PostBooksRoutingModule } from './post-books-routing.module';

@NgModule({
  declarations: [PostBooksComponent],
  imports: [
    CommonModule,
    PostBooksRoutingModule
  ]
})
export class PostBooksModule { }
