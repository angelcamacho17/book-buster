import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
import { FeBottomNavComponent } from '../fe-bottom-nav/fe-bottom-nav.component';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { FeCardComponent } from './components/fe-card/fe-card.component';
import { FeHeaderComponent } from './components/fe-header/fe-header.component';
import { FeSearchComponent } from './components/fe-search/fe-search.component';
import { FeCustomerRowComponent } from './components/fe-row/fe-customer-row/fe-customer-row.component';
import { FeArticleRowComponent } from './components/fe-row/fe-article-row/fe-article-row.component';
import { FeRowComponent } from './components/fe-row/fe-row.component';
import { FeDialogComponent } from './components/fe-dialog/fe-dialog.component';
import { FeConfirmDiscardDialogComponent } from './components/fe-confirm-discard/fe-confirm-discard-dialog.component';
import { EventService } from './services/event.service';
import { DataStoreModule } from '@fecommerce-workspace/data-store-lib';
import { FeArtSheetComponent } from './components/fe-art-sheet/fe-art-sheet.component';
import { FeSearchResultsComponent } from './components/fe-search/fe-search-results/fe-search-results.component';

@NgModule({
  declarations: [
    FeBottomNavComponent,
    FeCardComponent,
    FeCreateButtonComponent,
    FeCustomerRowComponent,
    FeHeaderComponent,
    FeSearchComponent,
    FeSearchResultsComponent,
    FeArticleRowComponent,
    FeRowComponent,
    FeDialogComponent,
    FeConfirmDiscardDialogComponent,
    FeArtSheetComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FeCardComponent,
    FeCreateButtonComponent,
    FeSearchComponent,
    FeSearchResultsComponent,
    FeHeaderComponent,
    FeCardComponent,
    FeCustomerRowComponent,
    FeArticleRowComponent,
    FeConfirmDiscardDialogComponent,
    FeArtSheetComponent

  ],
  providers: [
    EventService
  ],
  entryComponents: [
    FeCustomerRowComponent,
    FeArticleRowComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
