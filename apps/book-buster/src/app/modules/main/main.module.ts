import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { HomeResolver } from './home/home.resolver';
import { MainComponent } from './main.component';
import { LayoutService } from './shared/services/layout.service';
// import { CheckoutService } from './shared/services/checkout.service';
import { MaterialModule } from '../material/material.module';
import { BookSearchResolver } from './book-search/book-search.resolver';
import { PostBooksResolver } from './post-books/post-books.resolver';
import { RentedBooksResolver } from './rented-books/rented-books.resolver';
import { RentBookResolver } from './rent-book/rent-book.resolver';
import { BookResolver } from './book/book.resolver';
import { MainService } from './main.service';
import { BookGuard } from './book/book.guard';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MainRoutingModule,
    SharedModule,
    MaterialModule
  ],
  providers: [
    BookGuard,
    LayoutService,
    HomeResolver,
    // CheckoutService,
    BookSearchResolver,
    PostBooksResolver,
    RentedBooksResolver,
    BookResolver,
    RentBookResolver
  ],
  declarations: [MainComponent]
})
export class MainModule { }
