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

@NgModule({
  declarations: [
    FeBottomNavComponent,
    FeCardComponent,
    FeCreateButtonComponent,
    FeCustomerRowComponent,
    FeHeaderComponent,
    FeSearchComponent,
    FeArticleRowComponent,
    FeRowComponent
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
    FeHeaderComponent,
    FeCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
