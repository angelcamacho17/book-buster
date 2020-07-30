import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticleComponent } from './article.component';



@NgModule({
  declarations: [
    ArticleComponent, 
    ArticleDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ArticleModule { }
