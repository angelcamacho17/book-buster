import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppComponent } from './app.component';
import { CustomerKeyResolver, FeLoginGuard, FeAuthGuard } from '@fecommerce-workspace/data-store-lib';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./modules/fe-login/fe-login.module').then(m => m.FeLoginModule),
    data: { animation: 'login' },
    //canActivate: [FeLoginGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/fe-home/fe-home.module').then(m => m.FeHomeModule),
    data: { animation: 'home' },
    //canActivate: [FeAuthGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import('./modules/fe-customer/fe-customer.module').then(m => m.FeCustomerModule),
    data: { animation: 'customer' },
    //canActivate: [FeAuthGuard]
  },
  {
    path: 'article',
    loadChildren: () => import('./modules/fe-article/fe-article.module').then(m => m.FeArticleModule),
    data: { animation: 'article' },
    //canActivate: [FeAuthGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./modules/fe-order/fe-order.module').then(m => m.FeOrderModule),
    data: { animation: 'order' },
    //canActivate: [FeAuthGuard]
  },
  {
    path: 'neworder',
    loadChildren: () => import('./modules/fe-new-order/fe-new-order.module').then(m => m.FeNewOrderModule),
    data: { animation: 'neworder' },
    //canActivate: [FeAuthGuard]
  },
  {
    path: 'orderitems',
    loadChildren: () => import('./modules/fe-order-items/fe-order-items.module').then(m => m.FeOrderItemsModule),
    data: { animation: 'orderitems' },
    //canActivate: [FeAuthGuard]
  },
  // {
  //   path: ':customerKey',
  //   component: AppComponent,
  //   pathMatch: 'full',
  //   resolve: { customerKey: CustomerKeyResolver },
  // },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

