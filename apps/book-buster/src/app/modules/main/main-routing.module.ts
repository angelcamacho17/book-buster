import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeResolver } from './home/home.resolver';
import { BookSearchResolver } from './book-search/book-search.resolver';
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

