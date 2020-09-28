import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentedBooksComponent } from './rented-books.component'


const routes: Routes = [
  {
    path: '',
    component: RentedBooksComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class RentedBooksRoutingModule { }

