import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { EditOrderComponent } from './edit-order.component';
import { EditOrderCustomerComponent } from './edit-order-customer/edit-order-customer.component';
import { EditOrderArticlesComponent } from './edit-order-articles/edit-order-articles.component';
import { EditOrderItemsComponent } from './edit-order-items/edit-order-items.component';

const routes: Routes = [
  {
    path: 'customer',
    component: EditOrderCustomerComponent
  },
  {
    path: 'articles',
    component: EditOrderArticlesComponent
  },
  {
    path: 'order-items',
    component: EditOrderItemsComponent
  },
  { path: '**', redirectTo: 'customer' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class EditOrderRoutingModule { }

