import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { HomeResolver } from './home/home.resolver';
import { OrderOverviewResolver } from './order-overview/order-overview.resolver';
import { CustomerSearchResolver } from './customer-search/customer-search.resolver';
import { ArticleSearchResolver } from './article-search/article-search.resolver';
import { ArticleDetailResolver } from './article-detail/article-detail.resolver';
import { OrderItemsResolver } from './order-items/order-items.resolver';
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
        path: 'order-overview',
        loadChildren: () => import('./order-overview/order-overview.module').then(m => m.OrderOverviewModule),
        data: { animation: 'order-overview' },
        resolve: { OrderOverviewResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'order-items',
        loadChildren: () => import('./order-items/order-items.module').then(m => m.OrderItemsModule),
        data: { animation: 'order-items' },
        resolve: { OrderItemsResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'customer-search',
        loadChildren: () => import('./customer-search/customer-search.module').then(m => m.CustomerSearchModule),
        data: { animation: 'customer-search' },
        resolve: { CustomerSearchResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'article-search',
        loadChildren: () => import('./article-search/article-search.module').then(m => m.ArticleSearchModule),
        resolve: { ArticleSearchResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'article-detail/:id',
        loadChildren: () => import('./article-detail/article-detail.module').then(m => m.ArticleDetailModule),
        data: { animation: 'article-detail' },
        resolve: { ArticleDetailResolver }
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

