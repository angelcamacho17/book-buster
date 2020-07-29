import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../../material/material.module';
import { SetHeightDirective } from './directives/set-height.directive';
import { ScrollableDivDirective } from './directives/scrollable-div.directive';
import { ArtSheetComponent } from './components/art-sheet/art-sheet.component';
import { BaseComponent } from './components/base/base.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SetMainHeightDirective } from './directives/set-main-height.directive';
import { FillScrollableDirective } from './directives/fill-scrollable.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { SetHeaderHeightDirective } from './directives/set-header-height.directive';
import { RowComponent } from './components/search/search-results/row/row.component';
import { CustomerRowComponent } from './components/search/search-results/row/customer-row/customer-row.component';
import { ArticleRowComponent } from './components/search/search-results/row/article-row/article-row.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent,
    SetMainHeightDirective,
    FillScrollableDirective,
    SearchComponent,
    SearchResultsComponent,
    SetHeaderHeightDirective,
    RowComponent,
    CustomerRowComponent,
    ArticleRowComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipeModule
  ],
  exports: [
    MainHeaderComponent,
    CreateButtonComponent,
    DialogComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent,
    SetMainHeightDirective,
    FillScrollableDirective,
    SearchComponent,
    SearchResultsComponent,
    SetHeaderHeightDirective
  ]
})

export class SharedModule { }
