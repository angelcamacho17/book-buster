import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { NewOrderComponent } from './new-order.component';

const routes: Routes = [
  {
    path: '',
    component: NewOrderComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class NewOrderRoutingModule { }

