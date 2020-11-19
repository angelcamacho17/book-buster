import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeResolver } from './home/home.resolver';
import { BookSearchResolver } from './book-search/book-search.resolver';
import { PostBooksResolver } from './post-books/post-books.resolver';
import { RentedBooksResolver } from './rented-books/rented-books.resolver';
import { CreateBookResolver } from './create-book/create-book.resolver';
import { BookResolver } from './book/book.resolver';
import { RentBookResolver } from './rent-book/rent-book.resolver';
import { BookGuard } from './book/book.guard';
import { MainComponent } from './main.component';
import { EventDetailResolver } from './event-detail/event-detail.resolver';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
        data: { animation: 'home' },
        resolve: { HomeResolver }
        //canActivate: [FeLoginGuard]
      },

      {
        path: 'book-search',
        loadChildren: () => import('./book-search/book-search.module').then(m => m.BookSearchModule),
        data: { animation: 'book-search' },
        resolve: { BookSearchResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'post',
        loadChildren: () => import('./post-books/post-books.module').then(m => m.PostBooksModule),
        data: { animation: 'post-search' },
        resolve: { PostBooksResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'post-detail',
        loadChildren: () => import('./event-detail/event-detail.module').then(m => m.EventDetailModule),
        data: { animation: 'post-search' },
        resolve: { EventDetailResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'create-book',
        loadChildren: () => import('./create-book/create-book.module').then(m => m.CreateBookModule),
        data: { animation: 'create-search' },
        resolve: { CreateBookResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'rented',
        loadChildren: () => import('./rented-books/rented-books.module').then(m => m.RentedBooksModule),
        data: { animation: 'rented-search' },
        resolve: { RentedBooksResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'posted',
        loadChildren: () => import('./post-books/post-books.module').then(m => m.PostBooksModule),
        data: { animation: 'post-search' },
        resolve: { PostBooksResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'book-to-rent',
        loadChildren: () => import('./book/book.module').then(m => m.BookModule),
        data: { animation: 'book-to-rent' },
        resolve: { BookResolver },
        canActivate: [BookGuard]
      },
      {
        path: 'rent-book',
        loadChildren: () => import('./rent-book/rent-book.module').then(m => m.RentBookModule),
        data: { animation: 'rent-book' },
        resolve: { RentBookResolver },
        canActivate: [BookGuard]
      },
      { path: '**', redirectTo: 'home' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }

