import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { FeBottomNavComponent } from '../fe-bottom-nav/fe-bottom-nav.component';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { FeCardComponent } from './components/fe-card/fe-card.component';
import { FeSearchComponent } from './components/fe-search/fe-search.component';
import { FeHeaderComponent } from './components/fe-header/fe-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    FeBottomNavComponent,
    FeCardComponent,
    FeCreateButtonComponent,
    FeHeaderComponent,
    FeSearchComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FeCreateButtonComponent,
    FeSearchComponent,
    FeHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
