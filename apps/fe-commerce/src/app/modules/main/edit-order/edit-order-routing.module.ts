import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { EditOrderComponent } from './edit-order.component';

const routes: Routes = [
  {
    path: '',
    component: EditOrderComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class EditOrderRoutingModule { }

