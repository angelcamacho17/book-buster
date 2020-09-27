import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentBooksComponent } from './rent-books.component'


const routes: Routes = [
  {
    path: '',
    component: RentBooksComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class RentBooksRoutingModule { }

