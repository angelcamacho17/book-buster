import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSearchComponent } from './article-search/article-search.component';
import { CustomerSearchComponent } from './customer-search/customer-search.component';
import { SearchComponent } from './search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { RowComponent } from './search-results/row/row.component';
import { ArticleRowComponent } from './search-results/row/article-row/article-row.component';
import { CustomerRowComponent } from './search-results/row/customer-row/customer-row.component';
import { MaterialModule } from '../../../../material/material.module';
import { SharedModule } from '../../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';



@NgModule({
  declarations: [
    ArticleSearchComponent,
    ArticleRowComponent,
    CustomerSearchComponent,
    CustomerRowComponent,
    SearchComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslatePipeModule,
    SharedModule
  ],
  exports: [
    ArticleSearchComponent,
    ArticleRowComponent,
    CustomerSearchComponent,
    CustomerRowComponent,
    SearchComponent,
    SearchResultsComponent
  ]
})
export class SearchModule { }
