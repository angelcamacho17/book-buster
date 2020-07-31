import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeResolver } from './home/home.resolver';
import { EditOrderResolver } from './edit-order/edit-order.resolver';
import { CustomerSearchResolver } from './customer-search/customer-search.resolver';
import { ArticleSearchResolver } from './article-search/article-search.resolver';
import { OrderItemsResolver } from './order-items/order-items.resolver';

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
        path: 'new-order',
        loadChildren: () => import('./new-order/new-order.module').then(m => m.NewOrderModule),
        data: { animation: 'new-order' },
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'edit-order',
        loadChildren: () => import('./edit-order/edit-order.module').then(m => m.EditOrderModule),
        data: { animation: 'edit-order' },
        resolve: { EditOrderResolver }
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
        data: { animation: 'article-search' },
        resolve: { ArticleSearchResolver }
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

