import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostBooksComponent } from './post-books.component';
import { PostBooksRoutingModule } from './post-books-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [PostBooksComponent],
  imports: [
    CommonModule,
    PostBooksRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class PostBooksModule { }
