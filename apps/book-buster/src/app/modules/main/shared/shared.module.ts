import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHeaderComponent } from './components/main-header/main-header.component';
import { CreateButtonComponent } from './components/create-button/create-button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from '../../material/material.module';
import { SetHeightDirective } from './directives/set-height.directive';
import { ScrollableDivDirective } from './directives/scrollable-div.directive';
import { ArtSheetComponent } from './components/art-sheet/art-sheet.component';
import { BaseComponent } from './components/base/base.component';
import { CustomerRowComponent } from './components/row/customer-row/customer-row.component';
import { ArticleRowComponent } from './components/row/article-row/article-row.component';
import { ConfirmDiscardDialogComponent } from './components/confirm-discard/confirm-discard-dialog.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultsComponent } from './components/search/search-results/search-results.component';
import { SetMainHeightDirective } from './directives/set-main-height.directive';
import { FillScrollableDirective } from './directives/fill-scrollable.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipeModule } from '@fecommerce-workspace/data';
import { SetHeaderHeightDirective } from './directives/set-header-height.directive';
import { ScrollerDirective } from './directives/scroller.directive';
import { RowComponent } from './components/row/row.component';
import { MainHeaderMobileComponent } from './components/main-header/main-header-mobile/main-header-mobile.component';
import { MainHeaderTabletComponent } from './components/main-header/main-header-tablet/main-header-tablet.component';
import { LoadingStateComponent } from './components/loading-state/loading-state.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { BookRowComponent } from './components/row/book-row/book-row.component';
// import { MercadoPagoButtonComponent } from './components/mercadopago-button/mercadopago-button.component';
// import { LayoutService } from './services/layout.service';

@NgModule({
  declarations: [
    MainHeaderComponent,
    CreateButtonComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent,
    SetMainHeightDirective,
    FillScrollableDirective,
    SetHeaderHeightDirective,
    SearchComponent,
    SearchResultsComponent,
    RowComponent,
    CustomerRowComponent,
    ArticleRowComponent,
    DialogComponent,
    ConfirmDiscardDialogComponent,
    MainHeaderMobileComponent,
    MainHeaderTabletComponent,
    LoadingStateComponent,
    LoadingSpinnerComponent,
    ScrollerDirective,
    BookRowComponent,
    // MercadoPagoButtonComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslatePipeModule,
  ],
  exports: [
    MainHeaderComponent,
    CreateButtonComponent,
    SetHeightDirective,
    ArtSheetComponent,
    ScrollableDivDirective,
    BaseComponent,
    SetMainHeightDirective,
    FillScrollableDirective,
    SetHeaderHeightDirective,
    SearchComponent,
    SearchResultsComponent,
    RowComponent,
    BookRowComponent,
    CustomerRowComponent,
    DialogComponent,
    ArticleRowComponent,
    ConfirmDiscardDialogComponent,
    LoadingStateComponent,
    LoadingSpinnerComponent,
    ScrollerDirective,
    // MercadoPagoButtonComponent
  ],
  entryComponents: [
    CustomerRowComponent,
    ArticleRowComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class SharedModule { }
