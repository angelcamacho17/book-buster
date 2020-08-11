import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { ArticleSearchComponent } from './article-search.component';
import { ArticleSearchRoutingModule } from './article-search-routing.module';
import { ArticleSearchTabletComponent } from './article-search-tablet/article-search-tablet.component';
import { ArticleSearchMobileComponent } from './article-search-mobile/article-search-mobile.component';

@NgModule({
  declarations: [ArticleSearchComponent, ArticleSearchTabletComponent, ArticleSearchMobileComponent],
  imports: [
    CommonModule,
    ArticleSearchRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule
  ]
})
export class ArticleSearchModule { }
