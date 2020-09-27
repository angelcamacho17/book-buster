import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostBooksComponent } from './post-books.component'


const routes: Routes = [
  {
    path: '',
    component: PostBooksComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class PostBooksRoutingModule { }

