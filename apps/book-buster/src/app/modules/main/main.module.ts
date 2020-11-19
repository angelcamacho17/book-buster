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
import { EventDetailResolver } from './event-detail/event-detail.resolver';
import { RentBookResolver } from './rent-book/rent-book.resolver';
import { BookResolver } from './book/book.resolver';
import { MainService } from './main.service';
import { BookGuard } from './book/book.guard';
import { CreateBookResolver } from './create-book/create-book.resolver';

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
    CreateBookResolver,
    // CheckoutService,
    BookSearchResolver,
    PostBooksResolver,
    RentedBooksResolver,
    BookResolver,
    RentBookResolver,
    EventDetailResolver
  ],
  declarations: [MainComponent]
})
export class MainModule { }
