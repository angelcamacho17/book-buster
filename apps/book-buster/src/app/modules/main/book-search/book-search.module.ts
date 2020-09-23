import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookSearchComponent } from './book-search.component';
import { BookSearchMobileComponent } from './book-search-mobile/book-search-mobile.component';
import { BookSearchTabletComponent } from './book-search-tablet/book-search-tablet.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../../material/material.module';
import { TranslatePipeModule } from '@fecommerce-workspace/data-store-lib';
import { BookSearchRoutingModule } from './book-search-routing.module';
import { ScannerModule } from '@fecommerce-workspace/scanner';

@NgModule({
  declarations: [BookSearchComponent, BookSearchMobileComponent, BookSearchTabletComponent],
  imports: [
    CommonModule,
    BookSearchRoutingModule,
    SharedModule,
    MaterialModule,
    TranslatePipeModule,
    ScannerModule
  ]
})
export class BookSearchModule { }
