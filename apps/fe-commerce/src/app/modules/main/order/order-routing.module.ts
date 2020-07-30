import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { EditOrderResolver } from './edit-order/edit-order.resolver';
import { NewOrderResolver } from './new-order/new-order.resolver';
import { OrderItemsResolver } from './order-items/order-items.resolver';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new-order',
        loadChildren: () => import('./new-order/new-order.module').then(m => m.NewOrderModule),
        data: { animation: 'new-order' },
        resolve: { NewOrderResolver }
        //canActivate: [FeLoginGuard]
      },
      {
        path: 'edit-order',
        loadChildren: () => import('./edit-order/edit-order.module').then(m => m.EditOrderModule),
        data: { animation: 'edit-order' },
        resolve: { EditOrderResolver }
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
export class OrderRoutingModule { }

