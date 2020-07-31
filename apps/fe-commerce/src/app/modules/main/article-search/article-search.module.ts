import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { ArticleSearchComponent } from './article-search.component';

@NgModule({
  declarations: [ArticleSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ArticleSearchComponent }]),
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class ArticleSearchModule { }
