import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { ArticleSearchComponent } from './article-search.component';
import { ArticleSearchRoutingModule } from './article-search-routing.module';

@NgModule({
  declarations: [ArticleSearchComponent],
  imports: [
    CommonModule,
    ArticleSearchRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class ArticleSearchModule { }
