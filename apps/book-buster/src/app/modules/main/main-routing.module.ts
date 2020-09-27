import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeResolver } from './home/home.resolver';
import { BookSearchResolver } from './book-search/book-search.resolver';
import { PostBooksResolver } from './post-books/post-books.resolver';
import { RentBooksResolver } from './rent-books/rent-books.resolver';
import { MainComponent } from './main.component';

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
        path: 'rent',
        loadChildren: () => import('./rent-books/rent-books.module').then(m => m.RentBooksModule),
        data: { animation: 'rent-search' },
        resolve: { RentBooksResolver }
        //canActivate: [FeLoginGuard]
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

