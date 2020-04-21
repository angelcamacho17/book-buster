import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./modules/fe-home/fe-home.module').then(m => m.FeHomeModule)
  },
  {
    path: 'customer',
    loadChildren: () => import('./modules/fe-customer/fe-customer.module').then(m => m.FeCustomerModule),
  },
  {
    path: 'article',
    loadChildren: () => import('./modules/fe-article/fe-article.module').then(m => m.FeArticleModule),
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/fe-order/fe-order.module').then(m => m.FeOrderModule),
  },
  { path: '**', redirectTo: 'customer', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

