import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ArticleSearchComponent } from './article-search.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleSearchComponent,
    data: { animation: 'article-search' }
  },
  {
    path: 'edit',
    component: ArticleSearchComponent,
    data: { animation: 'article-search-edit' }
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArticleSearchRoutingModule { }

