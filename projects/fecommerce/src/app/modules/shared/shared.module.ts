import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeCreateButtonComponent } from './components/fe-create-button/fe-create-button.component';
import { MaterialLibModule } from 'material-lib';
import { FeCardComponent } from './components/fe-card/fe-card.component';
import { FeSearchComponent } from './components/fe-search/fe-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FeHeaderComponent } from './components/fe-header/fe-header.component';



@NgModule({
  declarations: [
    FeCardComponent,
    FeCreateButtonComponent,
    FeSearchComponent,
    FeHeaderComponent
  ],
  imports: [
    CommonModule,
    MaterialLibModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FeCardComponent,
    FeCreateButtonComponent,
    FeSearchComponent,
    FeHeaderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
