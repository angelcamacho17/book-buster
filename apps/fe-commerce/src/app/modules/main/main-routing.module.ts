import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
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
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'order',
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
        data: { animation: 'order' },
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'order-items',
        loadChildren: () => import('./order-items/order-items.module').then(m => m.OrderItemsModule),
        data: { animation: 'order-items' },
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

