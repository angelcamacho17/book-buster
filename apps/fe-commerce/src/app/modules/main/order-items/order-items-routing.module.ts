import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderItemsComponent } from './order-items.component';

const routes: Routes = [
  {
    path: '',
    component: OrderItemsComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class OrderItemsRoutingModule { }

