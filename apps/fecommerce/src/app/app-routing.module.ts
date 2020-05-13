import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./modules/fe-login/fe-login.module').then(m => m.FeLoginModule),
    data: { animation: 'login' }
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/fe-home/fe-home.module').then(m => m.FeHomeModule),
    data: { animation: 'home' }
  },
  {
    path: 'customer',
    loadChildren: () => import('./modules/fe-customer/fe-customer.module').then(m => m.FeCustomerModule),
    data: { animation: 'customer' }
  },
  {
    path: 'article',
    loadChildren: () => import('./modules/fe-article/fe-article.module').then(m => m.FeArticleModule),
    data: { animation: 'article' }
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/fe-order/fe-order.module').then(m => m.FeOrderModule),
    data: { animation: 'order' }
  },
  {
    path: 'neworder',
    loadChildren: () => import('./modules/fe-new-order/fe-new-order.module').then(m => m.FeNewOrderModule),
    data: { animation: 'neworder' }
  },
  {
    path: 'orderitems',
    loadChildren: () => import('./modules/fe-order-items/fe-order-items.module').then(m => m.FeOrderItemsModule),
    data: { animation: 'orderitems' }
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

