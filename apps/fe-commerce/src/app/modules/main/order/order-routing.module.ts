import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  },
  {
    path: 'edit',
    component: OrderComponent,
    data: { animation: 'edit-order' },
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

