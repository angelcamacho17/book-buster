import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeResolver } from './home/home.resolver';

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
      /*
      {
        path: 'new-order',
        loadChildren: () => import('./new-order/new-order.module').then(m => m.NewOrderModule),
        data: { animation: 'new-order' }
        //canActivate: [FeLoginGuard]
      }, 
      */
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
        data: { animation: 'order' },
        // resolve: { OrderItemsResolver }
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

