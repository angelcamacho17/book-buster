import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NewOrderCustomerComponent } from './new-order-customer/new-order-customer.component';
import { NewOrderArticlesComponent } from './new-order-articles/new-order-articles.component';

const routes: Routes = [
  {
    path: 'customer',
    component: NewOrderCustomerComponent
  },
  {
    path: 'articles',
    component: NewOrderArticlesComponent
  },
  { path: '**', redirectTo: 'customer' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class NewOrderRoutingModule { }

