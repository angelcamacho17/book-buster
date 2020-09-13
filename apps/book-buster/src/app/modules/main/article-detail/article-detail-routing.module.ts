import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { isObject } from 'util';
import { ArticleDetailComponent } from './article-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleDetailComponent
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(
    routes)],
  exports: [RouterModule]
})
export class ArticleDetailRoutingModule { }

