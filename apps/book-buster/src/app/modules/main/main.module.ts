import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeResolver } from './home/home.resolver';
import { MainComponent } from './main.component';
import { LayoutService } from './shared/services/layout.service';
import { MaterialModule } from '../material/material.module';
import { BookSearchResolver } from './book-search/book-search.resolver';
import { PostBooksResolver } from './post-books/post-books.resolver';
import { RentBooksResolver } from './rent-books/rent-books.resolver';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    LayoutService,
    HomeResolver,
    BookSearchResolver,
    PostBooksResolver,
    RentBooksResolver
  ],
  declarations: [MainComponent]
})
export class MainModule { }
